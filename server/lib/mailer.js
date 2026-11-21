import nodemailer from 'nodemailer';

const escape = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

let transporter;

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 465);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export function buildEnquiryEmail(data, recipients) {
  const topics = data.interests.length ? data.interests.join(', ') : 'Not specified';
  const subject = `New enquiry: ${data.business || data.name} · ${topics}`;
  const rows = [
    ['Name', data.name],
    ['Business / Brand', data.business || '—'],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Interested in', topics],
    ['Sent to', recipients.map((r) => r.name).join(' & ')],
  ];
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Project:',
    data.message,
    '',
    '— nottobrag.app contact form',
  ].join('\n');
  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;color:#222423">
    <div style="background:#6C6847;color:#F1E6D8;padding:18px 22px;border-radius:14px 14px 0 0;font-weight:600;letter-spacing:.02em">
      NOT TO BRAG® · New enquiry
    </div>
    <div style="border:1px solid #e2ded5;border-top:0;padding:20px 22px;border-radius:0 0 14px 14px">
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#6b6b66;white-space:nowrap;vertical-align:top">${escape(k)}</td><td style="padding:6px 0">${escape(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="margin:18px 0 6px;color:#6b6b66;font-size:13px">Project</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px;line-height:1.5">${escape(data.message)}</p>
      <p style="margin:22px 0 0;font-size:12px;color:#8a8a84">Reply to this email to answer ${escape(data.name)} directly.</p>
    </div>
  </div>`;
  return { subject, text, html };
}

/** Sends the enquiry. Returns { delivered: boolean }. */
export async function sendEnquiry(data, recipients) {
  const { subject, text, html } = buildEnquiryEmail(data, recipients);
  const message = {
    from: process.env.MAIL_FROM || `"NOT TO BRAG Website" <${process.env.SMTP_USER}>`,
    to: recipients.map((r) => r.email),
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject,
    text,
    html,
  };

  if (!smtpConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SMTP is not configured');
    }
    console.log('\n[contact] SMTP not configured — email not sent. Would send:\n', {
      to: message.to,
      replyTo: message.replyTo,
      subject,
    });
    console.log(text, '\n');
    return { delivered: false };
  }

  await getTransporter().sendMail(message);
  return { delivered: true };
}
