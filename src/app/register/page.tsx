import type { Metadata } from "next";
import { RegistrationPageContent } from "@/components/pages/RegistrationPageContent";

export const metadata: Metadata = {
  title: "Register — Ash-Shajrah Learning Hub",
  description:
    "Register your child for Ash-Shajrah Learning Hub. Online early years learning — Play Group, Prep-I, Prep-II.",
};

export default function RegisterPage() {
  return <RegistrationPageContent />;
}
