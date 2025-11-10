import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await resend.emails.send({
      from: "CraftyAam <notify@craftyaam.com>",
      to: "craftyaam@gmail.com",
      subject: "New subscriber on CraftyAam! 🥭",
      html: `
    <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="color: #f4a300; margin-bottom: 0.4em;">New Notify Me Signup</h2>
      <p style="margin: 0.6em 0;">
        A new visitor just subscribed via the <strong>“Notify Me”</strong> form.
      </p>
      <p style="margin: 1em 0; font-size: 1rem;">
        <strong>Email:</strong> ${email}
      </p>
      <hr style="margin: 1.2em 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 0.9rem; color: #555;">
        Sent automatically from the CraftyAam landing page.
      </p>
    </div>
  `,
    });

    await resend.emails.send({
      from: "CraftyAam <notify@craftyaam.com>",
      to: email,
      subject: "Crafted like an Aam — and you're part of it!",
      html: `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #222; padding: 1.5em;">
          <h2 style="color: #f4a300; margin-bottom: 0.3em;">Hey there, welcome to CraftyAam!</h2>
          <p style="margin: 0.8em 0;">
            CraftyAam is a creative tech studio where sharp code meets juicy ideas.
We craft delightful digital experiences that stand out, spark engagement, and leave a lasting flavour.
          </p>
          <p style="margin: 0.8em 0;">
            We'll get back to you soon.
          </p>
          <p style="margin-top: 1.5em;">Stay tuned (and stay juicy)🥭<br><strong>— Team CraftyAam</strong></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Emails sent successfully." });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: "Failed to send emails." }, { status: 500 });
  }
}
