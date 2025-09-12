// Email service configuration
export const EMAIL_CONFIG = {
  // Add your email service configuration here
  // Examples for different services:
  
  // Formspree
  formspree: {
    endpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || '',
  },
  
  // SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: 'hello@motion-conflux-studio.com',
  },
  
  // Resend
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: 'hello@motion-conflux-studio.com',
  },
};

// Email templates
export const EMAIL_TEMPLATES = {
  contactForm: {
    subject: 'New Contact Form Submission',
    html: (data: { name: string; email: string; subject: string; message: string }) => `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  },
  
  autoReply: {
    subject: 'Thank you for contacting Motion Conflux Studio',
    html: (name: string) => `
      <h2>Thank you, ${name}!</h2>
      <p>We've received your message and will get back to you within 24 hours.</p>
      <p>Best regards,<br>Motion Conflux Studio Team</p>
    `,
  },
};

// Email sending function (placeholder)
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  from: string = EMAIL_CONFIG.sendgrid.fromEmail
) {
  // Implement your preferred email service here
  // This is a placeholder - you'll need to integrate with your chosen service
  
  console.log('Email would be sent:', { to, subject, from });
  
  // Example with fetch to a serverless function:
  // const response = await fetch('/api/send-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ to, subject, html, from }),
  // });
  // return response.json();
}
