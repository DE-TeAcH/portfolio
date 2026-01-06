import { Resend } from 'resend';

export const config = {
    runtime: 'edge',
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { name, email, subject, message, type = 'contact' } = await request.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const isHiring = type === 'hire';
        const emailSubject = isHiring
            ? `New Hiring Inquiry: ${subject || 'No Subject'}`
            : `New Contact Message: ${subject || 'No Subject'}`;

        const headerText = isHiring ? 'New Hiring Inquiry' : 'New Message from your Portfolio';

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['zouatinezakaria22@gmail.com'],
            subject: emailSubject,
            replyTo: email,
            html: `
        <h2>${headerText}</h2>
        <p><strong>Type:</strong> ${isHiring ? 'Hiring Request' : 'General Contact'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Email sending error:', error);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
