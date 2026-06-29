import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  validateRegistrationForm,
  formatRegistrationEmailText,
  formatRegistrationEmailHtml,
  type RegistrationFormData,
} from "@/lib/register-form";
import {
  appendRegistrationToGoogleSheet,
  isGoogleSheetsConfigured,
} from "@/lib/google-sheets";

const SUCCESS_MESSAGE =
  "Thank you! Your registration has been submitted successfully. Our admissions team will contact you soon.";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return {
    host,
    port: Number(port || 587),
    secure: Number(port) === 465,
    auth: { user, pass },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegistrationFormData;

    // Honeypot check
    if (body.website?.trim()) {
      return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
    }

    const formData: RegistrationFormData = {
      parentName: body.parentName ?? "",
      whatsapp: body.whatsapp ?? "",
      email: body.email ?? "",
      childName: body.childName ?? "",
      childAge: body.childAge ?? "",
      level: body.level ?? "",
      cityCountry: body.cityCountry ?? "",
      message: body.message ?? "",
    };

    const errors = validateRegistrationForm(formData);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    if (!isGoogleSheetsConfigured()) {
      console.error("Google Sheets environment variables are not configured.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 503 }
      );
    }

    const smtpConfig = getSmtpConfig();
    if (!smtpConfig) {
      console.error("SMTP environment variables are not configured.");
      return NextResponse.json(
        { error: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 503 }
      );
    }

    const registration = {
      parentName: formData.parentName.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      childName: formData.childName.trim(),
      childAge: formData.childAge.trim(),
      level: formData.level.trim(),
      cityCountry: formData.cityCountry.trim(),
      message: formData.message.trim(),
    };

    // Save to Google Sheets — Registrations tab
    try {
      await appendRegistrationToGoogleSheet(registration);
    } catch (sheetError) {
      console.error("Google Sheets (Registrations) append failed:", sheetError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 500 }
      );
    }

    // Send email notification
    const toEmail =
      process.env.REGISTRATION_TO_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "admission.ashshajrah@gmail.com";
    const fromEmail = process.env.SMTP_FROM || smtpConfig.auth.user;
    const submittedAt = new Date().toLocaleString("en-PK", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Karachi",
    });

    try {
      const transporter = nodemailer.createTransport(smtpConfig);

      await transporter.sendMail({
        from: `"Ash-Shajrah Learning Hub" <${fromEmail}>`,
        to: toEmail,
        replyTo: registration.email,
        subject: "New Registration — Ash-Shajrah Learning Hub",
        text: formatRegistrationEmailText(formData, submittedAt),
        html: formatRegistrationEmailHtml(formData, submittedAt),
      });
    } catch (emailError) {
      console.error("Registration email send failed:", emailError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again or contact us on WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 }
    );
  }
}
