"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Fade from "@/components/Fade";
import SectionIntro from "@/components/SectionIntro";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zulker-nien/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/Zulker-Nien",
    icon: Github,
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0130cad0881a233037",
    icon: ArrowUpRight,
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const serviceId = process.env.NEXT_PUBLIC_SERVICEID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATEID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLICKEY;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    emailjs
      .send(
        serviceId!,
        templateId!,
        {
          from_name: form.name,
          to_name: "Zulker Nien",
          from_email: form.email,
          to_email: "zulkerb9b@gmail.com",
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          toast({
            title: "Thank you.",
            description: "I will get back to you as soon as possible.",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast({
            title: "Error",
            description: "Ahh, something went wrong. Please try again.",
          });
        }
      );
  };

  return (
    <section id="contact" className="relative bg-zinc-950 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 lg:pt-32">
        <SectionIntro
          index="07 — Contact"
          title="Let&apos;s build something."
        />

        <Fade className="mt-12 lg:mt-16">
          <a
            href="mailto:zulkerb9b@gmail.com"
            className="block text-2xl sm:text-4xl lg:text-6xl font-extralight tracking-tight text-slate-100 hover:text-amber-400 transition-colors duration-300 break-all"
          >
            zulkerb9b@gmail.com
          </a>
          <p className="mt-3 font-mono text-sm text-zinc-500 tracking-wider">
            +880 1717 755 244
          </p>
        </Fade>

        <div className="grid gap-12 mt-14 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          <Fade>
            <div>
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-t border-white/10 py-6 lg:py-7 flex items-center justify-between transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <span className="flex items-center gap-4 text-slate-200 font-light tracking-wide text-lg group-hover:text-amber-400 transition-colors duration-300">
                    <social.icon className="w-5 h-5 text-amber-400" />
                    {social.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </Link>
              ))}
              <div className="border-t border-b border-white/10" />
            </div>
          </Fade>

          <Fade>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs uppercase tracking-widest text-zinc-500 font-medium font-mono"
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  required
                  className="bg-black/40 border-white/10 focus-visible:border-amber-400/70 text-slate-100 h-12 px-4 rounded-xl placeholder:text-zinc-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-zinc-500 font-medium font-mono"
                >
                  Your Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  required
                  className="bg-black/40 border-white/10 focus-visible:border-amber-400/70 text-slate-100 h-12 px-4 rounded-xl placeholder:text-zinc-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest text-zinc-500 font-medium font-mono"
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  required
                  className="min-h-[160px] bg-black/40 border-white/10 focus-visible:border-amber-400/70 text-slate-100 p-4 rounded-xl placeholder:text-zinc-600 transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-amber-400 text-black hover:bg-amber-300 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 tracking-wide shadow-lg shadow-amber-950/40"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Fade>
        </div>
      </div>

      <Fade>
        <div className="relative border-t border-white/10 mt-20">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-zinc-600">
              Zulker Nien — est. 2020
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-amber-400/70">
              Built on the web&apos;s edge ✦
            </span>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Contact;