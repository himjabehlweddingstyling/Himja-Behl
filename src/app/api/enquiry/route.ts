import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const lookingForJoined = Array.isArray(data.lookingFor) ? data.lookingFor.join('; ') : (data.lookingFor || '');
    
    // 1. Format and save to CSV (safe fallback for local development; skipped on read-only serverless environments like Vercel)
    try {
      const csvPath = path.join(process.cwd(), 'leads.csv');
      const headers = 'DateSubmitted,Name,Email,Phone,Who,LookingFor,StyleDirection,WeddingDate,Location,Functions,Colors,Inspiration,Additional\n';
      
      // Simple CSV escaping for fields that might contain commas
      const escapeCsv = (str: string | undefined | null) => {
        if (!str) return '""';
        const cleanStr = String(str).replace(/"/g, '""');
        return `"${cleanStr}"`;
      };
      
      const row = [
        new Date().toISOString(),
        escapeCsv(data.name),
        escapeCsv(data.email),
        escapeCsv(data.phone),
        escapeCsv(data.who),
        escapeCsv(lookingForJoined),
        escapeCsv(data.styleDirection),
        escapeCsv(data.date),
        escapeCsv(data.location),
        escapeCsv(data.functions),
        escapeCsv(data.colors),
        escapeCsv(data.inspiration),
        escapeCsv(data.additional),
      ].join(',') + '\n';

      // If file doesn't exist, write headers first
      if (!fs.existsSync(csvPath)) {
        fs.writeFileSync(csvPath, headers);
      }
      
      // Append the new row
      fs.appendFileSync(csvPath, row);
    } catch (csvError) {
      console.log('Local CSV writing skipped (normal on read-only serverless environment like Vercel):', csvError);
    }

    // 2. Execute Nodemailer (optional fallback if SMTP credentials provided)
    const emailUser = process.env.GMAIL_USER;
    const emailPass = process.env.GMAIL_APP_PASSWORD;
    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Styling Enquiry</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F9F6F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A0407;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F9F6F0; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #EAE5D9; border-top: 4px solid #D4AF37;">
                  <tr>
                    <td style="padding: 40px; text-align: center; border-bottom: 1px solid #EAE5D9;">
                      <h1 style="margin: 0; font-family: Georgia, serif; font-size: 28px; font-weight: normal; letter-spacing: 4px; text-transform: uppercase; color: #1A0407;">Himja Behl</h1>
                      <p style="margin: 10px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #641D26;">New Styling Enquiry</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      
                      <!-- Contact Details -->
                      <h2 style="margin: 0 0 15px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; border-bottom: 1px solid #EAE5D9; padding-bottom: 10px;">Client Information</h2>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                        <tr>
                          <td width="35%" style="padding: 8px 0; font-size: 13px; color: #666666;">Name</td>
                          <td width="65%" style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.name || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Email</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;"><a href="mailto:${data.email}" style="color: #641D26; text-decoration: none;">${data.email || 'Not provided'}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Phone</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.phone || 'Not provided'}</td>
                        </tr>
                      </table>

                      <!-- Styling Details -->
                      <h2 style="margin: 0 0 15px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; border-bottom: 1px solid #EAE5D9; padding-bottom: 10px;">Styling Needs</h2>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                        <tr>
                          <td width="35%" style="padding: 8px 0; font-size: 13px; color: #666666;">Subject</td>
                          <td width="65%" style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.who || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Events</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${lookingForJoined || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Aesthetic</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.styleDirection || 'Not provided'}</td>
                        </tr>
                      </table>

                      <!-- Wedding Details -->
                      <h2 style="margin: 0 0 15px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; border-bottom: 1px solid #EAE5D9; padding-bottom: 10px;">Event Details</h2>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                        <tr>
                          <td width="35%" style="padding: 8px 0; font-size: 13px; color: #666666;">Date / Timeline</td>
                          <td width="65%" style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.date || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Location</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.location || 'Not provided'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-size: 13px; color: #666666;">Functions</td>
                          <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${data.functions || 'Not provided'}</td>
                        </tr>
                      </table>

                      <!-- Preferences -->
                      <h2 style="margin: 0 0 15px 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #D4AF37; border-bottom: 1px solid #EAE5D9; padding-bottom: 10px;">Creative Brief</h2>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="100%" style="padding: 8px 0 4px 0; font-size: 13px; color: #666666;">Preferred Colors</td>
                        </tr>
                        <tr>
                          <td style="padding: 0 0 15px 0; font-size: 14px; font-weight: 600;">${data.colors || 'None specified'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0 4px 0; font-size: 13px; color: #666666;">Inspiration / Designers</td>
                        </tr>
                        <tr>
                          <td style="padding: 0 0 15px 0; font-size: 14px; font-weight: 600; line-height: 1.5;">${data.inspiration || 'None specified'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0 4px 0; font-size: 13px; color: #666666;">Additional Requests</td>
                        </tr>
                        <tr>
                          <td style="padding: 0 0 8px 0; font-size: 14px; font-weight: 600; line-height: 1.5;">${data.additional || 'None specified'}</td>
                        </tr>
                      </table>

                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: center; background-color: #1A0407; color: #F9F6F0;">
                      <p style="margin: 0; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.5;">This enquiry was automatically generated from himjabehl.in</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      const mailOptions = {
        from: `"Himja Behl Website" <${emailUser}>`,
        to: process.env.ENQUIRY_TO ?? emailUser,
        replyTo: data.email || undefined,
        subject: `New Styling Enquiry: ${data.name || 'Unknown'}`,
        text: `New Styling Enquiry Received! Name: ${data.name} | Phone: ${data.phone}`,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send email via nodemailer:", emailError);
      // We don't fail the whole request just because email failed, since CSV saved!
    }
  }

    // 3. Sync to Google Sheets Webhook (if configured)
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          redirect: "follow",
          body: JSON.stringify({
            dateSubmitted: new Date().toISOString(),
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            who: data.who || "",
            lookingFor: lookingForJoined || "",
            styleDirection: data.styleDirection || "",
            weddingDate: data.date || "",
            location: data.location || "",
            functions: data.functions || "",
            colors: data.colors || "",
            inspiration: data.inspiration || "",
            additional: data.additional || "",
          }),
        });
      } catch (sheetsErr) {
        console.error("Failed to sync lead to Google Sheets:", sheetsErr);
      }
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error in enquiry API route:", error);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}
