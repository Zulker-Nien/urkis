"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Images from "@/utils/image";
import SectionHeading from "@/components/SectionHeading";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-zinc-950 relative w-screen pb-24 px-0 antialiased overflow-hidden">

      <div className="sticky top-0 w-full z-30 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-transparent backdrop-blur-sm pt-8 pb-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.07),transparent_70%)]" />
        <SectionHeading
          index="06"
          title="Connect With Me"
          description="Let's build something premium. Drop a line below or reach out over official channels."
        />
      </div>

      <div className="w-full max-w-6xl mx-auto flex lg:flex-row flex-col items-stretch justify-center lg:px-12 gap-8 px-6 mt-8">

        <div className="lg:w-1/2 w-full flex flex-col gap-4 bg-black/40 border border-amber-400/10 p-6 rounded-2xl backdrop-blur-md justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-center py-6 bg-black/40 rounded-xl border border-white/5 shadow-inner">
              <Image
                src={Images.Logo}
                alt="Logo"
                width={220}
                height={60}
                className="opacity-90 object-contain"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">zulkerb9b@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-xl text-xs text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+8801717755244</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-6 lg:pt-0">
            <Link href="https://www.linkedin.com/in/zulker-nien/" passHref target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" variant="outline" className="w-full bg-black/40 border-amber-400/20 text-slate-300 hover:bg-amber-400/10 hover:text-amber-300 hover:border-amber-400/40 flex items-center justify-center gap-2 rounded-xl text-sm">
                <Linkedin className="w-4 h-4 text-sky-400" /> LinkedIn
              </Button>
            </Link>

            <Link href="https://github.com/Zulker-Nien" passHref target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" variant="outline" className="w-full bg-black/40 border-amber-400/20 text-slate-300 hover:bg-amber-400/10 hover:text-amber-300 hover:border-amber-400/40 flex items-center justify-center gap-2 rounded-xl text-sm">
                <Github className="w-4 h-4 text-slate-100" /> Github
              </Button>
            </Link>

            <Link href="https://www.upwork.com/freelancers/~0130cad0881a233037" passHref target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full bg-amber-400 text-black hover:bg-amber-300 font-semibold flex items-center justify-center gap-2 rounded-xl text-sm shadow-lg shadow-amber-950/40">
                Upwork <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex flex-col bg-black/40 border border-amber-400/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl shadow-black/60">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-full justify-between gap-6">
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-slate-400 font-medium">
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
                  className="bg-black/60 border-white/10 focus-visible:border-amber-400/70 text-slate-100 h-11 px-4 rounded-xl placeholder:text-zinc-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs uppercase tracking-widest text-slate-400 font-medium">
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
                  className="bg-black/60 border-white/10 focus-visible:border-amber-400/70 text-slate-100 h-11 px-4 rounded-xl placeholder:text-zinc-600 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  required
                  className="min-h-[160px] bg-black/60 border-white/10 focus-visible:border-amber-400/70 text-slate-100 p-4 rounded-xl placeholder:text-zinc-600 transition-colors resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-amber-400 text-black hover:bg-amber-300 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 tracking-wide mt-2 shadow-lg shadow-amber-950/40"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;