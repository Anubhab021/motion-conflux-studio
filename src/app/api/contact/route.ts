import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, EMAIL_TEMPLATES } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email notification
    await sendEmail(
      'hello@motion-conflux-studio.com',
      EMAIL_TEMPLATES.contactForm.subject,
      EMAIL_TEMPLATES.contactForm.html({ name, email, subject, message })
    );

    // Send auto-reply to user
    await sendEmail(
      email,
      EMAIL_TEMPLATES.autoReply.subject,
      EMAIL_TEMPLATES.autoReply.html(name)
    );

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
