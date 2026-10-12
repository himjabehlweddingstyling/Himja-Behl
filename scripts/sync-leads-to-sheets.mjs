import fs from 'fs';
import path from 'path';

async function syncLeads() {
  const envPath = path.join(process.cwd(), '.env.local');
  let webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  
  if (!webhookUrl && fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GOOGLE_SHEETS_WEBHOOK_URL=(.*)/);
    if (match) webhookUrl = match[1].trim();
  }

  if (!webhookUrl) {
    console.error('❌ GOOGLE_SHEETS_WEBHOOK_URL is not set in .env.local');
    process.exit(1);
  }

  const csvPath = path.join(process.cwd(), 'leads.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('❌ leads.csv not found');
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n');
  if (lines.length <= 1) {
    console.log('No leads found in leads.csv');
    return;
  }

  // Parse CSV rows safely
  const parseRow = (line) => {
    const values = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        values.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    values.push(cur);
    return values;
  };

  const rows = lines.slice(1).map(parseRow);
  console.log(`Found ${rows.length} existing leads in leads.csv. Syncing to Google Sheets...`);

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const payload = {
      dateSubmitted: r[0] || new Date().toISOString(),
      name: r[1] || '',
      email: r[2] || '',
      phone: r[3] || '',
      who: r[4] || '',
      lookingFor: r[5] || '',
      styleDirection: r[6] || '',
      weddingDate: r[7] || '',
      location: r[8] || '',
      functions: r[9] || '',
      colors: r[10] || '',
      inspiration: r[11] || '',
      additional: r[12] || '',
    };

    console.log(`[${i + 1}/${rows.length}] Syncing: ${payload.name} (${payload.email})...`);
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        redirect: 'follow',
        body: JSON.stringify(payload),
      });
      const data = await res.text();
      console.log(`   -> Result:`, data);
    } catch (err) {
      console.error(`   ❌ Failed to sync lead:`, err.message);
    }
  }

  console.log('\n✅ All existing leads successfully synced to Google Sheets!');
}

syncLeads().catch(console.error);
