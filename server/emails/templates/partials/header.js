
// partials/header.js
export const header = (logoUrl = '') => `
  <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0; padding: 0;">
    <tr>
      <td style="padding: 0; margin: 0;">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); margin: 0; padding: 0;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <!-- Logo -->
              ${logoUrl ? `
                <img src="${logoUrl}" alt="Online Course E Learning Logo" style="height: 60px; width: auto; max-width: 200px; margin: 0 auto 20px; display: block; border: none; outline: none;" />
              ` : `
                <!-- Fallback logo placeholder if no logo URL provided -->
                <div style="background: rgba(255,255,255,0.15); width: 80px; height: 80px; border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                  <div style="width: 40px; height: 40px; background: #fff; border-radius: 8px; opacity: 0.9;"></div>
                </div>
              `}
              <h1 style="color: #fff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
                Online Course E Learning
              </h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0 0; font-weight: 400;">
                Educational Platform
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;