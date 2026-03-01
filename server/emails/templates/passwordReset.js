
// passwordResetTemplate.js
import { header } from './partials/header.js';
import { footer } from './partials/footer.js';

export const passwordResetTemplate = (name, resetURL, logoUrl = '') => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Password Reset - Online Course E Learning</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <![endif]-->
    <style>
      /* Reset styles for better email client compatibility */
      body, table, td, p, a, li, blockquote { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
      
      /* Responsive styles */
      @media screen and (max-width: 600px) {
        .container { width: 100% !important; }
        .content-padding { padding: 20px !important; }
        .button { padding: 15px 25px !important; font-size: 16px !important; }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    
    <!-- Spacer for Gmail -->
    <div style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all;">
      Reset your password to continue accessing your Online Course E Learning account.
    </div>
    
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0; padding: 0; background: #f1f5f9;">
      <tr>
        <td style="padding: 20px 0;">
          <table class="container" width="600" align="center" cellspacing="0" cellpadding="0" border="0" style="background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); margin: 0 auto;">
            
            <!-- Header -->
            ${header(logoUrl)}
            
            <!-- Main Content -->
            <tr>
              <td class="content-padding" style="padding: 40px 40px 30px 40px;">
                
                <!-- Greeting -->
                <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 20px 0; text-align: center; line-height: 1.3;">
                  Password Reset Request
                </h2>
                
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  Hello <strong style="color: #fb923c;">${name || "User"}</strong>,
                </p>
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                  We received a request to reset your password for your Online Course E Learning account. No worries, we've got you covered!
                </p>
                
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                  Click the button below to reset your password. This secure link will expire in <strong>15 minutes</strong> for your security.
                </p>
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${resetURL}" class="button" style="display: inline-block; background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(251, 146, 60, 0.4); transition: all 0.2s;">
                    Reset My Password
                  </a>
                </div>
                
                <!-- Alternative Link -->
                <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 30px 0;">
                  <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0; font-weight: 500;">
                    Button not working? Copy and paste this link:
                  </p>
                  <p style="word-break: break-all; margin: 0;">
                    <a href="${resetURL}" style="color: #fb923c; font-size: 14px; text-decoration: underline;">${resetURL}</a>
                  </p>
                </div>
                
                <!-- Security Note -->
                <div style="border-left: 4px solid #fbbf24; background: #fffbeb; padding: 16px 20px; margin: 30px 0; border-radius: 0 6px 6px 0;">
                  <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 500;">
                    <strong>Security tip:</strong> If you didn't request this password reset, please ignore this email or contact our support team if you have concerns.
                  </p>
                </div>
                
                <p style="color: #64748b; font-size: 15px; line-height: 1.6; margin: 25px 0 0 0;">
                  Best regards,<br>
                  <strong style="color: #fb923c;">The Online Course E Learning Team</strong>
                </p>
                
              </td>
            </tr>
            
            <!-- Footer -->
            ${footer}
            
          </table>
        </td>
      </tr>
    </table>
    
  </body>
  </html>
`;
