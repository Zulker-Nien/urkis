"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Images from "@/utils/image";
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
    <div className="relative lg:h-screen min-h-screen w-screen">
      <div className="absolute top-0 w-full h-full pb-0 lg:px-0 px-2 inset-shadow-indigo-500">
        <h5
          className={`lg:h-1/4 lg:text-[4em] text-[2em] text-center text-slate-800`}
        >
          Connect with me
        </h5>
        <div className="w-full flex lg:flex-row flex-col items-center justify-center lg:px-4 lg:gap-16 gap-4 px-6">
          <div className="lg:w-1/3 w-full flex flex-col gap-4">
            <div className="flex items-center justify-center drop-shadow-[0_10px_0_rgba(255,213,1)] rounded-t-lg">
              <Image
                src={Images.LogoB}
                alt="Logo"
                width={"300"}
                placeholder="blur"
              />
            </div>
            <Button variant={"outline"} className="w-full p-0">
              <Mail /> zulkerb9b@gmail.com
            </Button>

            <Button variant={"outline"} className="w-full p-0">
              <Phone /> +8801717755244
            </Button>
            <Link
              href="https://www.linkedin.com/in/zulker-nien/"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button size="lg" className="w-full">
                LinkedIn
              </Button>
            </Link>
            <Link
              href="https://github.com/Zulker-Nien"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button size="lg" className="w-full">
                Github
              </Button>
            </Link>
            <Link
              href="https://www.upwork.com/freelancers/~0130cad0881a233037"
              passHref={true}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button size="lg" className="w-full">
                Upwork
              </Button>
            </Link>
          </div>

          <div className="lg:w-1/3 w-full flex flex-col border p-4 rounded-xl bg-white/80 border-slate-300 lg:mb-0 mb-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8"
            >
              <Label className="flex flex-col">
                <span className="text-slate-800 font-medium mb-4">
                  Your Name
                </span>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                />
              </Label>
              <Label className="flex flex-col">
                <span className="text-slate-800 font-medium mb-4">
                  Your email
                </span>
                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your web address?"
                />
              </Label>
              <Label className="flex flex-col">
                <span className="text-slate-800 font-medium mb-4">
                  Your Message
                </span>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What you want to say?"
                  className="min-h-64 max-h-64"
                />
              </Label>

              <Button type="submit">{loading ? "Sending..." : "Send"}</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
