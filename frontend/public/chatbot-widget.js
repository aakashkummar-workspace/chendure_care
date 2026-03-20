/* ══════════════════════════════════════════════════════════════════════════
   TPH Chatbot Widget – Standalone JS

   USAGE:
   1. Add <link rel="stylesheet" href="chatbot-widget.css"> to <head>
   2. Add <script src="chatbot-widget.js"></script> before </body>
   3. Place 1.png and logo.png in the same directory (or update paths below)

   The widget auto-injects its HTML and initializes on DOMContentLoaded.
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Configuration — update these paths for your site ─────────────────────
  const CONFIG = {
    triggerImage: '/1.png',   // chatbot character image
    logoImage: '/logo.png',        // header logo
  };

  // ── Auto-inject HTML ────────────────────────────────────────────────────
  function injectHTML() {
    const html = `
    <!-- TPH Chatbot Trigger -->
    <div id="chatbot-trigger" onclick="document.getElementById('chatbot-window').classList.toggle('active')">
      <div class="trigger-typing-bubble">
        <span></span><span></span><span></span>
      </div>
      <img src="${CONFIG.triggerImage}" alt="Chat with us" class="chatbot-robot-img" />
    </div>

    <!-- TPH Chatbot Window -->
    <div id="chatbot-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <img src="${CONFIG.logoImage}" alt="TPH Logo" class="chat-logo" onerror="this.style.display='none'" />
          <h3 style="margin:0; font-size:1.15rem; font-weight:700; letter-spacing:0.01em;">The Printing House Assistant</h3>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button id="chat-refresh-btn" title="Restart conversation" class="chat-ctrl-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
          </button>
          <button onclick="document.getElementById('chatbot-window').classList.remove('active')" class="chat-ctrl-btn"
            style="font-size:1.2rem; line-height:1;">&times;</button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input-area">
        <input type="text" id="chat-input" class="chat-input" placeholder="Type your message...">
        <button id="send-btn" class="send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>`;

    const container = document.createElement('div');
    container.id = 'tph-chatbot-widget';
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  // ── Knowledge Base ──────────────────────────────────────────────────────
  const KB = {
    company: {
      name: "The Printing House",
      founder: "Dr. Mustafa Kamal",
      established: 1986,
      yearsExp: "40+",
      location: "No 6, Race Course Road, Kajamalai, Tiruchirappalli, Tamil Nadu 620023",
      phone: "+91 90031 69615",
      whatsapp: "919003169615",
      email: "tphtrichy@gmail.com",
      hours: "Monday to Friday, 9:00 AM – 8:30 PM",
      clients: "10,000+",
    },

    about: "The Printing House was founded by Dr. Mustafa Kamal and is the region's premier provider of high-quality printing services. Established in 1986, with over 40 years of experience, we are a recognized leader in both quick and commercial printing. We combine state-of-the-art technology with expertise to bring your ideas to life — beautifully, precisely, and efficiently.",

    services: {
      prepress: "Our PrePress team handles everything before printing:\n• Graphic design and layout\n• Typesetting and design consultation\n• Proofing and color management\n• File preparation and optimization\n• Consultation to ensure print readiness",
      printing: "Our core printing capabilities:\n• Digital Printing – fast turnaround for small to medium runs\n• Offset Printing – cost-effective, high-volume with superior color\n• Multi-color Printing – vibrant results using state-of-the-art machinery\n• Full-color and black & white printing\n• Specialty prints with custom finishes",
      finishing: "Our professional finishing services:\n• Cutting, folding, binding, and laminating\n• Stapling and collating\n• Premium lamination (gloss / matte)\n• Quality checks at every stage",
    },

    products: {
      "sun pack printing": "Professional <strong>Sun Pack Printing</strong> solutions (All-inclusive price).<br><br>\ud83d\udccb <strong>Price per piece (Multi-Colour):</strong><br>\u2022 1x1: \u20b915 (300) | \u20b914 (500) | \u20b912 (1000) | \u20b911 (2000)<br>\u2022 1x1.5: \u20b922.5 (300) | \u20b921 (500) | \u20b918 (1000) | \u20b916.5 (2000)<br>\u2022 2x1.5: \u20b945 (300) | \u20b942 (500) | \u20b936 (1000) | \u20b933 (2000)<br>\u2022 2x2: \u20b960 (300) | \u20b956 (500) | \u20b948 (1000) | \u20b944 (2000)<br>\u2022 3x2: \u20b990 (300) | \u20b984 (500) | \u20b972 (1000) | \u20b966 (2000)<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9500",
      "flex": "Premium <strong>Flex Printing</strong> & Media Solutions.<br><br>\ud83d\udccb <strong>Media Rates (per sq.ft):</strong><br>\u2022 Normal Flex: \u20b912 (Above 100 sq.ft)<br>\u2022 Black Media: \u20b920<br>\u2022 Star Flex: \u20b925<br>\u2022 Backlit / Vinyl: \u20b925<br>\u2022 Sun Pack: \u20b915<br><br>\ud83d\udcd0 <strong>Piece Rates:</strong><br>\u2022 3x2: \u20b9350 | 4x3: \u20b9450<br>\u2022 5x3: \u20b9500 | 6x3: \u20b9600<br>\u2022 8x3: \u20b9650 | 8x4: \u20b9750<br>\u2022 8x6: \u20b9900 | 10x5: \u20b9950<br>\u2022 10x6: \u20b91000 | 10x10: \u20b91150<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9350",
      "id cards": "Professional <strong>PVC ID Cards</strong> & Accessories.<br><br>\ud83d\udccb <strong>Pricing:</strong><br>\u2022 Pvc id card: \u20b950<br>\u2022 Holder: \u20b910<br>\u2022 Normal rope (no print): \u20b910<br>\u2022 Multi-color rope (fish hook): \u20b930<br><br>\ud83c\udfa8 <strong>Design Charges:</strong><br>\u2022 Qty < 10 nos: \u20b9150 (total)<br>\u2022 Qty > 10 nos: \u20b915 per card",
      "multi colour certificate": "Professional <strong>Multi-Colour Certificates</strong> (A4 Size).<br><br>\ud83d\udccb <strong>300 Gsm Art Board (Single Side):</strong><br>\u2022 1 - 20 nos: \u20b912 per cert<br>\u2022 20 - 250 nos: \u20b910 per cert<br>\u2022 300+ nos: \u20b907 per cert<br><br>\ud83d\udcc4 <strong>Special Boards:</strong><br>\u2022 Textured Board: \u20b920 per cert<br>\u2022 Metallic Board: \u20b925 per cert<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9300",
      "flyer a5 ss": "<strong>Flyer A5 (Single Side)</strong> - 21.5 x 14.5 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b92850<br>\u2022 5000 Nos: \u20b94250<br>\u2022 10000 Nos: \u20b96500<br><br>\ud83c\udfa8 <strong>Design Cost:</strong> \u20b9300",
      "flyer a5 fb": "<strong>Flyer A5 (Front & Back)</strong> - 21.5 x 14.5 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b92850<br>\u2022 5000 Nos: \u20b94750<br>\u2022 10000 Nos: \u20b97000<br><br>\ud83c\udfa8 <strong>Design Cost:</strong> \u20b9700",
      "flyer a4 ss": "<strong>Flyer A4 (Single Side)</strong> - 21.5 x 28.5 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b93200<br>\u2022 5000 Nos: \u20b96500<br>\u2022 10000 Nos: \u20b910500<br><br>\ud83c\udfa8 <strong>Design Cost:</strong> \u20b9500",
      "flyer a4 fb": "<strong>Flyer A4 (Front & Back)</strong> - 21.5 x 28.5 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b93000<br>\u2022 5000 Nos: \u20b97000<br>\u2022 10000 Nos: \u20b911500<br><br>\ud83c\udfa8 <strong>Design Cost:</strong> \u20b9800",
      "flyer a3 ss": "<strong>Flyer A3 (Single Side)</strong> - 42 x 21 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b93900<br>\u2022 5000 Nos: \u20b910500<br>\u2022 10000 Nos: \u20b918500",
      "flyer a3 fb": "<strong>Flyer A3 (Front & Back)</strong> - 42 x 21 cm.<br><br>\ud83d\udccb <strong>100 GSM Paper:</strong><br>\u2022 1000 Nos: \u20b93900<br>\u2022 5000 Nos: \u20b911500<br>\u2022 10000 Nos: \u20b921000",
      "multi colour envelopes": "Professional <strong>Multi-Colour Envelopes</strong> (10.5 x 4.5 inch).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet:</strong><br>\u2022 1000 Nos: \u20b95000<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9300",
      "double colour envelopes": "Professional <strong>Double-Colour Envelopes</strong> (10.5 x 4.5 inch).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet:</strong><br>\u2022 1000 Nos: \u20b92100<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9200",
      "single colour envelopes": "Professional <strong>Single-Colour Envelopes</strong> (10.5 x 4.5 inch).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet:</strong><br>\u2022 1000 Nos: \u20b91800<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9150",
      "synopsis binding": "Professional <strong>Synopsis Binding (Tape)</strong>.<br><br>\ud83d\udccb <strong>Pricing:</strong><br>\u2022 Less than 50 Pages: \u20b950<br>\u2022 50 - 200 Pages: \u20b9100<br>\u2022 More than 200 Pages: \u20b9200<br><br>\ud83c\udfa8 <strong>Extras:</strong><br>\u2022 For Color Board: \u20b915 extra",
      "multi colour letter head": "Professional <strong>Multi-Colour Letterheads</strong> (A4 - 210 x 297 mm).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet (Single Side):</strong><br>\u2022 500 Nos (Loose): \u20b92800<br>\u2022 1000 Nos (Loose): \u20b93500<br>\u2022 5 Pads (Finishing): \u20b92950<br>\u2022 10 Pads (Finishing): \u20b93800<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9300",
      "double colour letter head": "Professional <strong>Double-Colour Letterheads</strong> (A4 - 210 x 297 mm).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet (Single Side):</strong><br>\u2022 500 Nos (Loose): \u20b9950<br>\u2022 1000 Nos (Loose): \u20b91450<br>\u2022 5 Pads (Finishing): \u20b91100<br>\u2022 10 Pads (Finishing): \u20b91750<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9200",
      "single colour letter head": "Professional <strong>Single-Colour Letterheads</strong> (A4 - 210 x 297 mm).<br><br>\ud83d\udccb <strong>80 Gsm Bond Sheet (Single Side):</strong><br>\u2022 500 Nos (Loose): \u20b9750<br>\u2022 1000 Nos (Loose): \u20b91250<br>\u2022 5 Pads (Finishing): \u20b9900<br>\u2022 10 Pads (Finishing): \u20b91550<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> \u20b9150",
      "thesis": "Professional <strong>Thesis Printing & Binding</strong>.<br><br>\ud83d\udcdd <strong>Alignment (Per Page):</strong><br>\u2022 Normal: \u20b920 | With Table: \u20b930<br><br>\ud83d\udcc4 <strong>Printing (Per Page):</strong><br>\u2022 B/W (80gsm Copier): \u20b91.5<br>\u2022 B/W (Bond 85gsm): \u20b92<br>\u2022 Color (Bond 85gsm): \u20b910 - \u20b912<br><br>\ud83d\udcda <strong>Binding (Per Book):</strong><br>\u2022 Standard (2 Days): \u20b9350 (Incl. Design/Print/Lam)<br>\u2022 Express Bind (4 hrs): \u20b9450",
      "cd": "Professional <strong>CD Services</strong>.<br><br>\ud83d\udcbf <strong>Sticker:</strong> \u20b9150 (with Design)<br>\ud83d\udcc2 <strong>Writing:</strong> \u20b940 (with CD and Pouch)",
      "prescription pad": "Professional <strong>Prescription Pads</strong>.<br><br>\ud83d\udccb <strong>A5 (70gsm SC):</strong><br>\u2022 1000 Nos: \u20b9500 (Loose) | \u20b9750 (Pad)<br>\u2022 2000 Nos: \u20b9800 (Loose) | \u20b91200 (Pad)<br><br>\ud83d\udccb <strong>A4 (70gsm SC):</strong><br>\u2022 1000 Nos: \u20b9800 (Loose) | \u20b91050 (Pad)<br>\u2022 2000 Nos: \u20b91600 (Loose) | \u20b92100 (Pad)<br><br>\ud83d\udccb <strong>A4 (80gsm MC):</strong><br>\u2022 1000 Nos: \u20b94000 (Loose) | \u20b94250 (Pad)<br>\u2022 2000 Nos: \u20b95000 (Loose) | \u20b95500 (Pad)",
      "lamination": "Professional <strong>Lamination Services</strong> (Standard A4 Size).<br><br>\ud83d\udd25 <strong>Thermal Mode:</strong><br>\u2022 Gloss: \u20b95 per A4<br>\u2022 Matt: \u20b95 per A4<br>\u2022 Velvet: \u20b912 per A4<br><br>\ud83d\udca7 <strong>Glue Mode:</strong><br>\u2022 Gloss: \u20b90.7 per A4<br>\u2022 Matt: \u20b90.8 per A4",
      "doctor file - plastic": "Professional <strong>Doctor Files (Plastic)</strong>.<br><br>\ud83d\ude9a <strong>Despatch:</strong> 2 Weeks from Design Finalization<br><br>\ud83d\udccb <strong>Size 12x18 (1 Crease 4 Hole):</strong><br>\u2022 SS: \u20b927 (1k) | \u20b926.5 (2k) | \u20b926 (3k)<br>\u2022 DS: \u20b932 (1k) | \u20b931.5 (2k) | \u20b931 (3k)<br><br>\ud83d\udccb <strong>Size 12.5x19.4 (2 Crease 4 Hole):</strong><br>\u2022 SS: \u20b928 (1k) | \u20b927.5 (2k) | \u20b927 (3k)<br>\u2022 DS: \u20b933 (1k) | \u20b932.5 (2k) | \u20b932 (3k)",
      "binding": "Professional <strong>Binding Services</strong> for all needs.<br><br>\ud83d\udcca <strong>General Binding (Spiral/Tape/Synopsis):</strong><br>\u2022 < 50 pgs: \u20b950 | 50-100 pgs: \u20b980<br>\u2022 100-200 pgs: \u20b9100 | 200+ pgs: \u20b9200<br>\u2022 Color Board: +\u20b915 extra<br><br>\ud83d\udcd8 <strong>Project Binding:</strong><br>\u2022 Blue Board: \u20b9130 | Gold/Silver: \u20b9150<br>\u2022 Express (4 hrs): \u20b9180<br><br>\ud83d\udcd5 <strong>Soft Binding:</strong> Color: \u20b9110 | B/W: \u20b990<br><br>\ud83d\udcd3 <strong>Record Binding:</strong> \u20b9100 (Normal) | \u20b9120 (Marble)",
      "business cards": "Premium <strong>Digital Visiting Cards</strong> & 13x19 Sheet Printing.<br><br>\ud83d\udccb <strong>Digital Card Packs (per 100 nos):</strong><br>\u2022 Gloss 250gsm: SS \u20b9150 | FB \u20b9200<br>\u2022 Gloss 300gsm: SS \u20b9200 | FB \u20b9300<br>\u2022 Synthetic 175m: SS \u20b9300 | FB \u20b9400<br>\u2022 Texture Board: SS \u20b9250 | FB \u20b9350<br>\u2022 Metallic Board: SS \u20b9300 | FB \u20b9400<br>\u2022 Kraft: SS \u20b9260 | FB \u20b9450<br>\u2022 Cobble Trans: SS \u20b9350 | FB \u20b9650<br>\u2022 Ivory - Kent X: SS \u20b9300 | FB \u20b9550<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> SS \u20b9250 | DS \u20b9300",
      "offset visiting card": "Premium <strong>Offset Visiting Cards</strong>.<br><br>\ud83d\udccb <strong>Gloss Lamination:</strong><br>\u2022 SS 500 nos \u2014 \u20b9460 (\u20b9543 incl. GST)<br>\u2022 FB 500 nos \u2014 \u20b9580 (\u20b9684 incl. GST)<br>\u2022 SS 1000 nos \u2014 \u20b9640 (\u20b9755 incl. GST)<br>\u2022 FB 1000 nos \u2014 \u20b9840 (\u20b9991 incl. GST)<br><br>\ud83d\udccb <strong>Matt Lamination:</strong><br>\u2022 SS 500 nos \u2014 \u20b9500 (\u20b9590 incl. GST)<br>\u2022 FB 500 nos \u2014 \u20b9680 (\u20b9802 incl. GST)<br>\u2022 SS 1000 nos \u2014 \u20b9680 (\u20b9802 incl. GST)<br>\u2022 FB 1000 nos \u2014 \u20b9900<br><br>\ud83c\udfa8 <strong>Design Charges:</strong> SS \u20b9250 | DS \u20b9350",
    },

    testimonials: [
      { name: "Praveen Kumar", review: "Availed their service several times. Excellent quality and prompt service. Definitely a recommended place and trusted business partner." },
      { name: "Rangarajan", review: "Very customer oriented. Prices are economical. Great for calendars, brochures, flyers etc. I strongly recommend The Printing House!" },
      { name: "Sarmila Banu", review: "A one stop HUB for designing and offset printing. On time delivery with reasonable pricing. Excellent customer support." },
      { name: "N Krishna Kumar", review: "Gave a brochure design for urgent printing. They accepted the order and made it ready on time. Really useful!" },
      { name: "Noel Martin", review: "Totally recommended. Only here I got the real gold colour output in digital print \u2014 and more economical too." },
      { name: "Tamil Selvan", review: "We conducted a state level Memory Championship at Anna University. All designs done by The Printing House. Excellent services! Value for money." },
      { name: "Vinoth Muthu", review: "Car mat papers and calendars \u2014 very good quality and reasonable price. Can't get better value in Tamil Nadu." },
    ],
  };

  // ── Pricing Options ─────────────────────────────────────────────────────
  const PRODUCT_PRICING_OPTIONS = {
    "offset visiting card": [
      "Gloss | Single Side | 500 nos \u2014 \u20b9460 (\u20b9543 incl. GST)",
      "Gloss | Double Side | 500 nos \u2014 \u20b9580 (\u20b9684 incl. GST)",
      "Gloss | Single Side | 1000 nos \u2014 \u20b9640 (\u20b9755 incl. GST)",
      "Gloss | Double Side | 1000 nos \u2014 \u20b9840 (\u20b9991 incl. GST)",
      "Matt  | Single Side | 500 nos \u2014 \u20b9500 (\u20b9590 incl. GST)",
      "Matt  | Double Side | 500 nos \u2014 \u20b9680 (\u20b9802 incl. GST)",
      "Matt  | Single Side | 1000 nos \u2014 \u20b9680 (\u20b9802 incl. GST)",
      "Matt  | Double Side | 1000 nos \u2014 \u20b9900",
    ],
    "business cards": [
      "--- CARD PACKS (100 NOS) ---",
      "Digital | Gloss 250gsm | 100 nos \u2014 SS \u20b9150 / FB \u20b9200",
      "Digital | Gloss 300gsm | 100 nos \u2014 SS \u20b9200 / FB \u20b9300",
      "Digital | Synthetic 175m | 100 nos \u2014 SS \u20b9300 / FB \u20b9400",
      "Digital | Texture Board | 100 nos \u2014 SS \u20b9250 / FB \u20b9350",
      "Digital | Metallic Board | 100 nos \u2014 SS \u20b9300 / FB \u20b9400",
      "Digital | Kraft Paper | 100 nos \u2014 SS \u20b9260 / FB \u20b9450",
      "Digital | Cobble Trans | 100 nos \u2014 SS \u20b9350 / FB \u20b9650",
      "Digital | Ivory - Kent X | 100 nos \u2014 SS \u20b9300 / FB \u20b9550",
    ],
    "multi colour certificate": [
      "Board | 300 Gsm Art Board | 1-20 nos \u2014 \u20b912/cert",
      "Board | 300 Gsm Art Board | 20-250 nos \u2014 \u20b910/cert",
      "Board | 300 Gsm Art Board | 300+ nos \u2014 \u20b907/cert",
      "Board | Textured Board \u2014 \u20b920/cert",
      "Board | Metallic Board \u2014 \u20b925/cert",
    ],
    "multi colour letter head": [
      "Pad | 5 Pads (Neat Finishing) \u2014 \u20b92950",
      "Pad | 10 Pads (Neat Finishing) \u2014 \u20b93800",
      "Loose | 500 Nos (Loose Sheets) \u2014 \u20b92800",
      "Loose | 1000 Nos (Loose Sheets) \u2014 \u20b93500",
    ],
    "multi colour envelopes": ["Multi-Colour | 1000 Nos (10.5x4.5) \u2014 \u20b95000"],
    "double colour envelopes": ["Double-Colour | 1000 Nos (10.5x4.5) \u2014 \u20b92100"],
    "double colour letter head": [
      "Pad | 5 Pads (Neat Finishing) \u2014 \u20b91100",
      "Pad | 10 Pads (Neat Finishing) \u2014 \u20b91750",
      "Loose | 500 Nos (Loose Sheets) \u2014 \u20b9950",
      "Loose | 1000 Nos (Loose Sheets) \u2014 \u20b91450",
    ],
    "single colour envelopes": ["Single-Colour | 1000 Nos (10.5x4.5) \u2014 \u20b91800"],
    "single colour letter head": [
      "Pad | 5 Pads (Neat Finishing) \u2014 \u20b9900",
      "Pad | 10 Pads (Neat Finishing) \u2014 \u20b91550",
      "Loose | 500 Nos (Loose Sheets) \u2014 \u20b9750",
      "Loose | 1000 Nos (Loose Sheets) \u2014 \u20b91250",
    ],
    "id cards": [
      "PVC ID Card \u2014 \u20b950",
      "Card + Holder \u2014 \u20b960",
      "Card + Holder + Normal Rope \u2014 \u20b970",
      "Card + Holder + Multi-Color Rope \u2014 \u20b990",
    ],
    "flyer a5 ss": ["1000 Nos \u2014 \u20b92850", "3000 Nos \u2014 \u20b93550", "5000 Nos \u2014 \u20b94250", "10000 Nos \u2014 \u20b96500", "50000 Nos \u2014 \u20b922900"],
    "flyer a5 fb": ["1000 Nos \u2014 \u20b92850", "3000 Nos \u2014 \u20b93550", "5000 Nos \u2014 \u20b94750", "10000 Nos \u2014 \u20b97000", "40000 Nos \u2014 \u20b920000"],
    "flyer a4 ss": ["1000 Nos \u2014 \u20b93200", "3000 Nos \u2014 \u20b94600", "5000 Nos \u2014 \u20b96500", "10000 Nos \u2014 \u20b910500", "50000 Nos \u2014 \u20b940900"],
    "flyer a4 fb": ["1000 Nos \u2014 \u20b93000", "3000 Nos \u2014 \u20b95100", "5000 Nos \u2014 \u20b97000", "10000 Nos \u2014 \u20b911500", "40000 Nos \u2014 \u20b937900"],
    "flyer a3 ss": ["1000 Nos \u2014 \u20b93900", "3000 Nos \u2014 \u20b97200", "5000 Nos \u2014 \u20b910500", "10000 Nos \u2014 \u20b918500", "25000 Nos \u2014 \u20b943500"],
    "flyer a3 fb": ["1000 Nos \u2014 \u20b93900", "3000 Nos \u2014 \u20b97700", "5000 Nos \u2014 \u20b911500", "10000 Nos \u2014 \u20b921000", "25000 Nos \u2014 \u20b949500"],
    "flex": [
      "--- PIECE RATES ---",
      "3x2 Piece \u2014 \u20b9350", "4x3 Piece \u2014 \u20b9450", "5x3 Piece \u2014 \u20b9500",
      "6x3 Piece \u2014 \u20b9600", "8x4 Piece \u2014 \u20b9750", "10x5 Piece \u2014 \u20b9950",
      "--- MEDIA (PER SQ.FT) ---",
      "Normal Flex \u2014 \u20b912 (Above 100 sq.ft)", "Black Media \u2014 \u20b920",
      "Star Flex \u2014 \u20b925", "Backlit / Vinyl \u2014 \u20b925", "Sun Pack \u2014 \u20b915",
    ],
    "sun pack printing": [
      "--- PIECES: 300 NOS ---",
      "1x1 | 300 Nos \u2014 \u20b915 (MC)", "1x1.5 | 300 Nos \u2014 \u20b922.50 (MC)",
      "2x1.5 | 300 Nos \u2014 \u20b945 (MC)", "2x2 | 300 Nos \u2014 \u20b960 (MC)", "3x2 | 300 Nos \u2014 \u20b990 (MC)",
      "--- PIECES: 500 NOS ---",
      "1x1 | 500 Nos \u2014 \u20b914 (MC)", "1x1.5 | 500 Nos \u2014 \u20b921 (MC)",
      "2x1.5 | 500 Nos \u2014 \u20b942 (MC)", "2x2 | 500 Nos \u2014 \u20b956 (MC)", "3x2 | 500 Nos \u2014 \u20b984 (MC)",
      "--- PIECES: 1000 NOS ---",
      "1x1 | 1000 Nos \u2014 \u20b912 (MC)", "1x1.5 | 1000 Nos \u2014 \u20b918 (MC)",
      "2x1.5 | 1000 Nos \u2014 \u20b936 (MC)", "2x2 | 1000 Nos \u2014 \u20b948 (MC)", "3x2 | 1000 Nos \u2014 \u20b972 (MC)",
      "--- PIECES: 2000 NOS ---",
      "1x1 | 2000 Nos \u2014 \u20b911 (MC)", "1x1.5 | 2000 Nos \u2014 \u20b916.5 (MC)",
      "2x1.5 | 2000 Nos \u2014 \u20b933 (MC)", "2x2 | 2000 Nos \u2014 \u20b944 (MC)", "3x2 | 2000 Nos \u2014 \u20b966 (MC)",
    ],
    "thesis": [
      "Binding | Standard (2 Days) \u2014 \u20b9350/book",
      "Binding | Express Bind (4 hrs) \u2014 \u20b9450/book",
      "Alignment | Normal \u2014 \u20b920/page",
      "Alignment | With Table \u2014 \u20b930/page",
      "Print | B/W (Bond 85gsm) \u2014 \u20b92/page",
      "Print | Color (Bond 85gsm) \u2014 \u20b910/page",
    ],
    "cd": ["CD Sticker (with Design) \u2014 \u20b9150", "CD Writing (with CD & Pouch) \u2014 \u20b940"],
    "synopsis binding": [
      "Binding | Less than 50 Pages \u2014 \u20b950",
      "Binding | 50 - 200 Pages \u2014 \u20b9100",
      "Binding | More than 200 Pages \u2014 \u20b9200",
      "Extra | Color Board \u2014 \u20b915 extra",
    ],
    "binding": [
      "Spiral / Tape Binding \u2014 \u20b950 - \u20b9200",
      "Project | Blue Board \u2014 \u20b9130/book",
      "Project | Gold/Silver \u2014 \u20b9150/book",
      "Express Project (4 hrs) \u2014 \u20b9180/book",
      "Soft Binding (Color) \u2014 \u20b9110/book",
      "Soft Binding (B/W) \u2014 \u20b990/book",
      "Record Binding \u2014 \u20b9100 - \u20b9120",
    ],
    "lamination": [
      "Thermal | Gloss \u2014 \u20b95/page (A4)",
      "Thermal | Matt \u2014 \u20b95/page (A4)",
      "Thermal | Velvet \u2014 \u20b912/page (A4)",
      "Glue | Gloss \u2014 \u20b90.7/page (A4)",
      "Glue | Matt \u2014 \u20b90.8/page (A4)",
    ],
    "prescription pad": [
      "A5 SC | 1000 Nos (Loose) \u2014 \u20b9500",
      "A5 SC | 1000 Nos (With Pad) \u2014 \u20b9750",
      "A4 SC | 1000 Nos (Loose) \u2014 \u20b9800",
      "A4 SC | 1000 Nos (With Pad) \u2014 \u20b91050",
      "A4 MC | 1000 Nos (With Pad) \u2014 \u20b94250",
      "--- QUANTITY: 2000 NOS ---",
      "A5 SC | 2000 Nos (With Pad) \u2014 \u20b91200",
      "A4 SC | 2000 Nos (With Pad) \u2014 \u20b92100",
      "A4 MC | 2000 Nos (With Pad) \u2014 \u20b95500",
    ],
    "doctor file - plastic": [
      "12x18 SS | 1000 Nos \u2014 \u20b927/ea",
      "12x18 DS | 1000 Nos \u2014 \u20b932/ea",
      "12.5x19.4 SS | 1000 Nos \u2014 \u20b928/ea",
      "12.5x19.4 DS | 1000 Nos \u2014 \u20b933/ea",
      "--- QUANTITY: 3000 NOS ---",
      "12x18 SS | 3000 Nos \u2014 \u20b926/ea",
      "12x18 DS | 3000 Nos \u2014 \u20b931/ea",
      "12.5x19.4 SS | 3000 Nos \u2014 \u20b927/ea",
      "12.5x19.4 DS | 3000 Nos \u2014 \u20b932/ea",
    ],
  };

  const PRODUCT_CATEGORIES = [
    { category: 'Signage & Display', items: ['sun pack printing', 'flex'] },
    { category: 'Cards & IDs', items: ['business cards', 'offset visiting card', 'id cards'] },
    { category: 'Flyers', items: ['flyer a5 ss', 'flyer a5 fb', 'flyer a4 ss', 'flyer a4 fb', 'flyer a3 ss', 'flyer a3 fb'] },
    { category: 'Stationery', items: ['multi colour letter head', 'double colour letter head', 'single colour letter head', 'multi colour envelopes', 'double colour envelopes', 'single colour envelopes', 'multi colour certificate'] },
    { category: 'Medical & Files', items: ['prescription pad', 'doctor file - plastic'] },
    { category: 'Binding & Finishing', items: ['binding', 'synopsis binding', 'thesis', 'lamination', 'cd'] }
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────
  function matchesAny(text, keywords) {
    return keywords.some(function (kw) { return text.includes(kw); });
  }

  function extractName(text) {
    var patterns = [
      /(?:i[''\u2019]?m|my name is|i am|call me|this is)\s+([a-z][a-z'-]{1,20})/i,
      /^([A-Z][a-z]{1,20})(?:\s+here)?[!.,]?\s*$/,
    ];
    for (var i = 0; i < patterns.length; i++) {
      var m = text.match(patterns[i]);
      if (m && m[1]) {
        var n = m[1].toLowerCase();
        var skip = ['looking', 'interested', 'here', 'need', 'want', 'asking', 'trying'];
        if (skip.indexOf(n) === -1) return m[1];
      }
    }
    return null;
  }

  // ── Chatbot Class ───────────────────────────────────────────────────────
  function Chatbot() {
    this.messagesContainer = document.getElementById('chat-messages');
    this.input = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('send-btn');
    this.history = [];
    this.memory = { mentionedProducts: [] };
    this.leadData = {};
    this.currentStep = 0;
    this.isProcessing = false;
    this.pendingProducts = [];
    this.scrollLock = false;
    this.init();
  }

  Chatbot.prototype.init = function () {
    var self = this;
    this.sendBtn.addEventListener('click', function () { self.handleSendMessage(); });
    this.input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') self.handleSendMessage();
    });
    var refreshBtn = document.getElementById('chat-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () { self.resetConversation(); });
    }
    this.showWelcomeGreeting();
  };

  Chatbot.prototype.showWelcomeGreeting = function () {
    var self = this;
    setTimeout(function () {
      self.addBot('\ud83d\udc4b Welcome to <strong>The Printing House</strong>, Trichy!', 'greeting');
      self.addBot("I'm your printing consultant \u2014 here to help with quotes, product info, services, and more. With <strong>40+ years of expertise</strong>, we handle everything from business cards to bulk commercial printing. How can I help you today?", 'greeting');
      self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udccd Location & Contact', '\u23f0 Working Hours']);
    }, 600);
  };

  Chatbot.prototype.greet = function () {
    return this.memory.name ? this.memory.name : '';
  };

  Chatbot.prototype.recordHistory = function (role, content, intent) {
    this.history.push({ role: role, content: content, intent: intent, timestamp: Date.now() });
    if (this.history.length > 30) this.history.shift();
  };

  Chatbot.prototype.isFollowUp = function (lw) {
    var followUpWords = ['more', 'tell me', 'what about', 'how about', 'explain', 'details', 'elaborate', 'pricing for that', 'cost of that', 'price of it', 'how much for it', 'how much for that', 'and that', 'that one'];
    return matchesAny(lw, followUpWords) && !!this.memory.lastTopic;
  };

  Chatbot.prototype.smartScroll = function (el) {
    if (this.scrollLock) return;
    var container = this.messagesContainer;
    var isTall = el.offsetHeight > container.offsetHeight * 0.7;
    if (isTall) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.scrollLock = true;
    } else {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  Chatbot.prototype.addBot = function (html, intent) {
    var div = document.createElement('div');
    div.className = 'message bot';
    div.innerHTML = html;
    this.messagesContainer.appendChild(div);
    this.smartScroll(div);
    var plain = html.replace(/<[^>]*>/g, '');
    this.recordHistory('bot', plain, intent || '');
  };

  Chatbot.prototype.addUser = function (text, intent) {
    var div = document.createElement('div');
    div.className = 'message user';
    div.innerHTML = text;
    this.messagesContainer.appendChild(div);
    this.smartScroll(div);
    this.recordHistory('user', text, intent || '');
  };

  Chatbot.prototype.addQuickReplies = function (options) {
    var self = this;
    var container = document.createElement('div');
    container.className = 'quick-replies';
    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        container.remove();
        self.scrollLock = false;
        self.addUser(opt, 'quick-reply');
        self.processResponse(opt);
      });
      container.appendChild(btn);
    });
    this.messagesContainer.appendChild(container);
    this.smartScroll(container);
  };

  Chatbot.prototype.addChecklist = function (groups, buttonText, onsubmit) {
    var self = this;
    var container = document.createElement('div');
    container.className = 'checklist-container';
    var checkboxes = [];
    groups.forEach(function (group) {
      var categoryLabel = document.createElement('div');
      categoryLabel.className = 'checklist-category';
      categoryLabel.innerHTML = '<strong>' + group.category + '</strong>';
      container.appendChild(categoryLabel);
      group.items.forEach(function (opt) {
        var label = document.createElement('label');
        label.className = 'checklist-item' + (group.hideCheckbox ? ' hidden-checkbox' : '');
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.value = opt;
        checkboxes.push(cb);
        label.appendChild(cb);
        var displayName = group.hideCheckbox ? opt.charAt(0).toUpperCase() + opt.slice(1) : opt;
        label.appendChild(document.createTextNode(displayName));
        container.appendChild(label);
      });
    });
    var btn = document.createElement('button');
    btn.className = 'checklist-submit';
    btn.textContent = buttonText;
    btn.addEventListener('click', function () {
      var selected = checkboxes.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
      if (selected.length === 0) return;
      container.remove();
      var text = selected.join(', ');
      self.addUser(text, 'checklist-submit');
      onsubmit(selected);
    });
    container.appendChild(btn);
    this.messagesContainer.appendChild(container);
    this.smartScroll(container);
  };

  Chatbot.prototype.addPricingOptions = function (options, onSelect) {
    var self = this;
    var container = document.createElement('div');
    container.className = 'pricing-options';
    var label = document.createElement('div');
    label.className = 'pricing-options-label';
    label.innerHTML = '\ud83d\udc47 <strong>Select your option to proceed:</strong>';
    container.appendChild(label);
    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'pricing-option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', function () {
        container.remove();
        self.addUser(opt, 'pricing-select');
        onSelect(opt);
      });
      container.appendChild(btn);
    });
    this.messagesContainer.appendChild(container);
    this.smartScroll(container);
  };

  Chatbot.prototype.addTyping = function () {
    var self = this;
    return new Promise(function (resolve) {
      var el = document.createElement('div');
      el.className = 'message bot typing-indicator';
      el.innerHTML = '<span></span><span></span><span></span>';
      el.id = 'typing-indicator';
      self.messagesContainer.appendChild(el);
      self.smartScroll(el);
      setTimeout(function () { el.remove(); resolve(); }, 700);
    });
  };

  Chatbot.prototype.resetConversation = function () {
    this.history = [];
    this.memory = { mentionedProducts: [] };
    this.leadData = {};
    this.pendingProducts = [];
    this.currentStep = 0;
    this.isProcessing = false;
    this.messagesContainer.innerHTML = '';
    this.showWelcomeGreeting();
  };

  Chatbot.prototype.handleSendMessage = function () {
    var text = this.input.value.trim();
    if (!text || this.isProcessing) return;
    this.scrollLock = false;
    this.addUser(text, 'user-input');
    this.input.value = '';
    document.querySelectorAll('.quick-replies').forEach(function (el) { el.remove(); });
    this.processResponse(text);
  };

  // ── Main Router ─────────────────────────────────────────────────────────
  Chatbot.prototype.processResponse = function (text) {
    var self = this;
    this.isProcessing = true;
    this.scrollLock = false;
    this.addTyping().then(function () {
      var lw = text.toLowerCase();
      var possibleName = extractName(text);
      if (possibleName && !self.memory.name) self.memory.name = possibleName;

      if (self.currentStep > 0) { self.handleQuoteFlow(text); self.isProcessing = false; return; }
      if (matchesAny(lw, ['start over', 'reset', 'restart', 'main menu', 'menu', 'back', 'home'])) { self.resetConversation(); self.isProcessing = false; return; }
      if (self.isFollowUp(lw)) { self.handleFollowUp(lw); self.isProcessing = false; return; }

      if (matchesAny(lw, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'namaste', 'vanakkam', 'hii', 'helo'])) {
        var name = self.greet();
        self.addBot('Hello' + (name ? ', <strong>' + name + '</strong>' : '') + '! \ud83d\udc4b Great to have you here. What can I assist you with today?', 'greeting');
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services', '\ud83d\udccd Location & Contact']);
        self.memory.lastTopic = 'greeting'; self.isProcessing = false; return;
      }

      if (possibleName) {
        self.addBot('Nice to meet you, <strong>' + possibleName + '</strong>! \ud83d\ude0a How can I assist you with your printing needs today?', 'name');
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services', '\ud83d\udccd Location & Contact']);
        self.memory.lastTopic = 'name'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['about', 'who are you', 'company', 'history', 'founder', 'mustafa', 'established', 'since', 'background', 'tell me about'])) {
        self.addBot('\ud83c\udfe2 <strong>About The Printing House</strong><br><br>' + KB.about, 'about');
        self.addBot('\ud83d\udcca <strong>Key Facts:</strong><br>\u2022 Founded by <strong>Dr. Mustafa Kamal</strong><br>\u2022 Established: <strong>1986</strong> (40+ years!)<br>\u2022 <strong>10,000+</strong> happy clients<br>\u2022 100% quality guaranteed', 'about');
        self.memory.lastTopic = 'about';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['location', 'address', 'where', 'trichy', 'tiruchirappalli', 'find you', 'directions', 'map'])) {
        self.addBot('\ud83d\udccd <strong>Our Location</strong><br><br>' + KB.company.location, 'location');
        self.addBot('<a href="https://maps.google.com/?q=No+6+Race+Course+Road+Kajamalai+Tiruchirappalli" target="_blank" style="color:#C1282E; font-weight:bold;">\ud83d\udccc Open in Google Maps \u2192</a>', 'location');
        self.memory.lastTopic = 'location'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['contact', 'phone', 'number', 'email', 'reach', 'get in touch'])) {
        self.addBot('\ud83d\udcde <strong>Contact Us' + (self.memory.name ? ', ' + self.memory.name : '') + '</strong><br><br>Phone: <strong>' + KB.company.phone + '</strong><br>Email: <strong>' + KB.company.email + '</strong><br>Hours: <strong>' + KB.company.hours + '</strong>', 'contact');
        self.addBot('<a href="https://wa.me/' + KB.company.whatsapp + '" target="_blank" style="color:#C1282E; font-weight:bold;">\ud83d\udcac Chat on WhatsApp \u2192</a>', 'contact');
        self.memory.lastTopic = 'contact'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['hours', 'timing', 'open', 'close', 'time', 'working', 'available', 'when are you'])) {
        self.addBot('\u23f0 <strong>Working Hours</strong><br><br>We are open <strong>Monday to Friday</strong><br>\ud83d\udd58 <strong>9:00 AM \u2013 8:30 PM</strong><br><br>For urgent orders outside hours, WhatsApp us at <strong>' + KB.company.phone + '</strong>.', 'hours');
        self.memory.lastTopic = 'hours'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['whatsapp', 'wa.me', 'wp', 'watsapp'])) {
        self.addBot('\ud83d\udcac Connect with us on WhatsApp for fast responses' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '!', 'whatsapp');
        self.addBot('<a href="https://wa.me/' + KB.company.whatsapp + '" target="_blank" class="cta-button" style="display:inline-block; margin-top:8px; text-decoration:none;">Chat on WhatsApp \u2192</a>', 'whatsapp');
        self.memory.lastTopic = 'whatsapp'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['service', 'what do you do', 'offering', 'capabilities', 'what can you do'])) {
        self.addBot('\ud83d\udee0\ufe0f <strong>Our Services</strong><br><br>We offer a complete end-to-end printing solution in three stages:', 'services');
        self.memory.lastTopic = 'services';
        self.addQuickReplies(['1\ufe0f\u20e3 PrePress', '2\ufe0f\u20e3 Printing', '3\ufe0f\u20e3 Finishing & Delivery', '\ud83d\udccb Get a Quote']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['prepress', 'pre press', 'pre-press', 'design', 'graphic', 'layout', 'file prep', '1\ufe0f\u20e3'])) {
        self.addBot('\ud83c\udfa8 <strong>PrePress Services</strong><br><br>' + KB.services.prepress.replace(/\n/g, '<br>'), 'prepress');
        self.memory.lastTopic = 'prepress';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '2\ufe0f\u20e3 Printing', '3\ufe0f\u20e3 Finishing & Delivery']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['offset', 'digital print', 'multicolor', 'multi-color', 'color printing', 'b&w', 'black and white', '2\ufe0f\u20e3'])) {
        self.addBot('\ud83d\udda8\ufe0f <strong>Printing Services</strong><br><br>' + KB.services.printing.replace(/\n/g, '<br>'), 'printing');
        self.memory.lastTopic = 'printing';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['finish', 'laminate', 'binding', 'cutting', 'fold', 'staple', 'delivery', '3\ufe0f\u20e3'])) {
        self.addBot('\u2702\ufe0f <strong>Finishing & Delivery</strong><br><br>' + KB.services.finishing.replace(/\n/g, '<br>'), 'finishing');
        self.memory.lastTopic = 'finishing';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['product', 'items', 'catalogue', 'catalog', 'what can you print', 'what do you print', 'what types', 'print what'])) {
        self.addBot('\ud83d\udce6 <strong>Our Product Categories</strong><br>We offer high-quality printing across many categories. Select one to see our products:', 'products');
        self.addQuickReplies(PRODUCT_CATEGORIES.map(function (c) { return c.category; }));
        self.memory.lastTopic = 'product-categories'; self.isProcessing = false; return;
      }

      var matchedCategory = PRODUCT_CATEGORIES.find(function (c) { return lw === c.category.toLowerCase(); });
      if (matchedCategory) {
        var itemsList = matchedCategory.items.map(function (p) { return '\u2022 ' + p.charAt(0).toUpperCase() + p.slice(1); }).join('<br>');
        var promptText = self.memory.name
          ? 'Which one interests you, <strong>' + self.memory.name + '</strong>? I can give you full details and arrange a quote.'
          : 'Which product would you like to know more about? I can provide full details and a quotation.';
        self.addBot('\ud83d\udcc1 <strong>' + matchedCategory.category + '</strong><br><br>' + itemsList + '<br><br>' + promptText, 'category-detail');
        self.memory.lastTopic = 'category-detail'; self.isProcessing = false; return;
      }

      // Product lookup
      var productMap = {
        "sun pack printing": ['sun pack', 'sunpack', 'sunpack printing', 'advertisement board'],
        "flex": ['flex', 'banner', 'hoarding', 'vinyl', 'backlit', 'sunpack', 'star flex'],
        "id cards": ['id card', 'pvc card', 'identity card', 'idcard'],
        "flyer a5 ss": ['flyer a5 ss', 'a5 flyer ss', 'a5 flyer single', 'a5 flyer single side'],
        "flyer a5 fb": ['flyer a5 fb', 'a5 flyer fb', 'a5 flyer back', 'a5 flyer front and back'],
        "flyer a4 ss": ['flyer a4 ss', 'a4 flyer ss', 'a4 flyer single', 'a4 flyer single side'],
        "flyer a4 fb": ['flyer a4 fb', 'a4 flyer fb', 'a4 flyer back', 'a4 flyer front and back'],
        "flyer a3 ss": ['flyer a3 ss', 'a3 flyer ss', 'a3 flyer single', 'a3 flyer single side'],
        "flyer a3 fb": ['flyer a3 fb', 'a3 flyer fb', 'a3 flyer back', 'a3 flyer front and back'],
        "multi colour certificate": ['certificate', 'award'],
        "multi colour envelopes": ['multi colour envelopes', 'multi color envelope', 'multicolour envelope', 'multi colour envelope'],
        "double colour envelopes": ['double colour envelopes', 'double color envelope', 'double colour envelope'],
        "single colour envelopes": ['single colour envelopes', 'single color envelope', 'single colour envelope'],
        "synopsis binding": ['synopsis', 'synopsis binding', 'tape binding'],
        "multi colour letter head": ['multi colour letterhead', 'multi color letterhead', 'multi colour letter head'],
        "double colour letter head": ['double colour letterhead', 'double color letterhead', 'double colour letter head', 'double colour letter'],
        "single colour letter head": ['single colour letterhead', 'single color letterhead', 'single colour letter head'],
        "thesis": ['thesis', 'dissertation', 'project report', 'thesis binding'],
        "cd": ['cd', 'dvd', 'cd writing', 'cd sticker'],
        "prescription pad": ['prescription', 'prescription pad', 'doctor pad', 'medical pad'],
        "lamination": ['lamination', 'laminate', 'laminating', 'id lamination', 'sheet lamination'],
        "binding": ['binding', 'spiral binding', 'hard binding', 'soft binding', 'project binding', 'comb binding'],
        "doctor file - plastic": ['doctor file', 'plastic file', 'medical file', 'file printing'],
        "business cards": ['business card', 'visiting card', 'name card', 'offset visiting', 'offset card', 'visiting card rate', 'card rate', 'card price', 'vc rate'],
        "offset visiting card": ['offset visiting card'],
      };

      var hasNewProductMention = false;
      for (var key in productMap) {
        if (matchesAny(lw, productMap[key])) { hasNewProductMention = true; break; }
      }
      if (lw.indexOf('flyer') !== -1) hasNewProductMention = true;

      for (var product in productMap) {
        if (matchesAny(lw, productMap[product])) {
          self.leadData = { product: product };
          self.addBot('Great! You\'re interested in <strong>' + product.charAt(0).toUpperCase() + product.slice(1) + '</strong>.', 'product-ack');
          self.currentStep = 1;
          self.addBot('\ud83d\udccb <strong>Let\'s get you those details' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '!</strong><br><br>First \u2014 could you please share your <strong>Name</strong>?', 'quote');
          self.memory.lastProduct = product;
          self.memory.lastTopic = 'quote';
          self.memory.lastIntent = product;
          if (self.memory.mentionedProducts.indexOf(product) === -1) self.memory.mentionedProducts.push(product);
          self.isProcessing = false; return;
        }
      }

      if (lw.indexOf('flyer') !== -1) {
        self.addBot('\ud83d\udcc4 <strong>Flyers & Leaflets</strong><br><br>We offer high-quality flyers in A5, A4, and A3 sizes with various paper options.', 'flyer-choice');
        self.addBot('Which size would you like a price for?', 'flyer-choice');
        self.addQuickReplies(['Flyer A5', 'Flyer A4', 'Flyer A3']);
        self.memory.lastTopic = 'product-choice'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['quote', 'quotation', 'price', 'cost', 'rate', 'how much', 'estimate', 'pricing', 'charges', 'yes, get quote', 'get a quote'])) {
        self.leadData = {};
        if (!hasNewProductMention && self.memory.lastProduct && (lw.indexOf('how much') !== -1 || lw.indexOf('price') !== -1 || lw.indexOf('cost') !== -1)) {
          self.leadData.product = self.memory.lastProduct;
        }
        self.currentStep = 1;
        self.addBot('\ud83d\udccb <strong>Let\'s get you a quotation' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '!</strong><br><br>First \u2014 could you please share your <strong>Name</strong>?', 'quote');
        self.memory.lastTopic = 'quote'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['bulk', 'large quantity', 'large order', 'wholesale', 'corporate', 'big order', 'high volume'])) {
        self.addBot('\ud83c\udfed <strong>Bulk & Corporate Orders</strong><br><br>High-volume commercial printing is our forte! We handle:<br>\u2022 Large-quantity offset printing<br>\u2022 Corporate stationery kits<br>\u2022 Event & promotional materials<br>\u2022 Educational institution needs', 'bulk');
        self.memory.lastTopic = 'bulk';
        self.addQuickReplies(['\ud83d\udccb Start Bulk Enquiry', '\ud83d\udcde Call Us', '\ud83d\udcac WhatsApp']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['urgent', 'rush', 'emergency', 'same day', 'asap', 'fast', 'quick delivery', 'as soon as'])) {
        self.addBot('\u26a1 <strong>Urgent Orders</strong><br><br>Yes' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + ', we accommodate urgent printing requests! Our team is known for fast turnaround without compromising quality.', 'urgent');
        self.addBot('\ud83d\udcde <strong>' + KB.company.phone + '</strong><br><a href="https://wa.me/' + KB.company.whatsapp + '" target="_blank" style="color:#C1282E; font-weight:bold;">\ud83d\udcac WhatsApp Us Now \u2192</a>', 'urgent');
        self.memory.lastTopic = 'urgent'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['review', 'testimonial', 'feedback', 'rating', 'recommend', 'what do customers say', 'opinions'])) {
        var t = KB.testimonials[Math.floor(Math.random() * KB.testimonials.length)];
        self.addBot('\u2b50 <strong>What our clients say:</strong><br><br><em>"' + t.review + '"</em><br><br>\u2014 <strong>' + t.name + '</strong>', 'reviews');
        self.addBot('We have <strong>10,000+</strong> happy clients across Tiruchirappalli. Want to experience our quality' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '?', 'reviews');
        self.memory.lastTopic = 'reviews';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udcde Call Us', '\ud83d\udcac WhatsApp']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['file', 'format', 'pdf', 'ai file', 'psd', 'cdr', 'jpeg', 'png', 'artwork', 'design file', 'send file', 'submit file'])) {
        self.addBot('\ud83d\udcc1 <strong>File Formats We Accept</strong><br><br>We accept: <strong>PDF, AI, PSD, CDR, JPEG/PNG</strong><br><br>Not sure if your file is ready? Our PrePress team will prepare it for you.', 'file-formats');
        self.memory.lastTopic = 'file-formats'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['quality', 'guarantee', 'assurance', 'defect', 'mistake', 'error', 'standard'])) {
        self.addBot('\u2705 <strong>Our Quality Promise</strong><br><br>We have a rigorous quality control process at every stage \u2014 from pre-press proofing to final finishing. Every print is checked to ensure it meets the highest standards.<br><br>Over <strong>10,000+ satisfied clients</strong> and 40 years in business speak for our quality!', 'quality');
        self.memory.lastTopic = 'quality'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['minimum', 'min order', 'small order', 'one piece', 'single copy', 'how many minimum', 'minimum quantity'])) {
        self.addBot('\ud83d\udccf <strong>Minimum Order</strong><br><br>We accept orders of <strong>any size</strong> \u2014 from a single piece to high-volume bulk orders. Contact us for quantity-based pricing.', 'min-order');
        self.memory.lastTopic = 'min-order';
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udcde Call Us']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['how long', 'turnaround', 'days', 'lead time', 'ready in', 'how many days', 'delivery time'])) {
        self.addBot('\u23f1\ufe0f <strong>Turnaround Time</strong><br><br>Turnaround depends on the product and quantity. Urgent orders are always accommodated. For time-sensitive requirements, please call or WhatsApp us directly.', 'turnaround');
        self.addBot('\ud83d\udcde <strong>' + KB.company.phone + '</strong>', 'turnaround');
        self.memory.lastTopic = 'turnaround'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['machine', 'machinery', 'equipment', 'technology', 'press', 'latest machine'])) {
        self.addBot('\u2699\ufe0f <strong>Our Machinery</strong><br><br>The Printing House uses the <strong>latest state-of-the-art printing machinery</strong>:<br>\u2022 Modern offset printing presses<br>\u2022 Advanced digital printers<br>\u2022 Multi-color printing machines<br>\u2022 Professional finishing equipment<br><br>This allows us to deliver at any scale \u2014 from one piece to lakhs of copies.', 'machinery');
        self.memory.lastTopic = 'machinery'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['call', 'call us', 'talk to someone', 'speak', 'human', 'agent', 'executive', 'speak to'])) {
        self.addBot('\ud83d\udcde Our team is ready to assist' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '!<br><br><strong>' + KB.company.phone + '</strong><br>' + KB.company.hours, 'call');
        self.addBot('Prefer WhatsApp? <a href="https://wa.me/' + KB.company.whatsapp + '" target="_blank" style="color:#C1282E; font-weight:bold;">Tap here \u2192</a>', 'call');
        self.memory.lastTopic = 'call'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['start bulk enquiry', 'bulk enquiry'])) {
        self.leadData = {};
        self.currentStep = 1;
        self.addBot('\ud83d\udccb Let\'s start your bulk enquiry' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '!<br><br>Could you please share your <strong>Name</strong>?', 'bulk-quote');
        self.memory.lastTopic = 'quote'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'got it', 'okay', 'ok', 'sure'])) {
        var nm = self.greet();
        self.addBot('\ud83d\ude0a You\'re welcome' + (nm ? ', <strong>' + nm + '</strong>' : '') + '! Is there anything else I can help you with?', 'thanks');
        self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udcde Contact Us']);
        self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['what did we discuss', 'what have we talked', 'summary', 'our conversation', 'what did i ask', 'recap'])) {
        self.handleContextSummary(); self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['motto', 'moto', 'tagline', 'slogan', 'mission', 'what is your', 'your mission', 'your vision', 'your goal', 'what does tph stand for', 'company goal'])) {
        self.addBot('\ud83c\udfaf <strong>Our Motto</strong><br><br><em>"Precision in Every Print."</em><br><br>At The Printing House, we believe every print job is an opportunity to elevate your brand. Our mission is to deliver <strong>excellence, accuracy, and quality</strong> through every project \u2014 combining 40+ years of craftsmanship with modern technology.', 'motto');
        self.memory.lastTopic = 'motto'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['owner', 'founder', 'who founded', 'who started', 'who owns', 'proprietor', 'who is the owner', 'owner name', 'founder name', 'who is behind', 'md ', 'managing director', 'director name', 'jamila', 'mustafa'])) {
        self.addBot('\ud83d\udc64 <strong>Our Founder & Owner</strong><br><br>The Printing House was founded by <strong>Dr. Mustafa Kamal</strong>, a visionary leader who established the company in <strong>1986</strong>.<br><br>The business is also managed by <strong>Mrs. Jamila</strong>, who is known for her warm customer service and professional approach. Together, they have built TPH into the region\'s most trusted printing partner.', 'owner');
        self.memory.lastTopic = 'owner'; self.isProcessing = false; return;
      }

      if (matchesAny(lw, ['who am i', 'who am i?', 'what is my name', 'do you know me', 'do you know my name', 'my name', 'remember me', 'what did i tell you'])) {
        if (self.memory.name) {
          self.addBot('\ud83d\ude0a You told me your name is <strong>' + self.memory.name + '</strong>! I remember everything you\'ve shared with me in this conversation.', 'who-am-i');
        } else {
          self.addBot("I don't know your name yet! \ud83d\ude42 Feel free to introduce yourself \u2014 just say something like <em>\"My name is [your name]\"</em> and I'll remember it for the rest of our conversation.", 'who-am-i');
        }
        self.memory.lastTopic = 'who-am-i'; self.isProcessing = false; return;
      }

      // Fallback
      var fallbackName = self.greet();
      self.addBot('Hello' + (fallbackName ? ', <strong>' + fallbackName + '</strong>' : '') + '! \ud83d\udc4b Welcome to <strong>The Printing House</strong>. How can I assist you today?', 'fallback');
      self.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services', '\ud83d\udccd Location & Hours', '\ud83d\udcac WhatsApp']);
      self.isProcessing = false;
    });
  };

  Chatbot.prototype.handleFollowUp = function (lw) {
    var product = this.memory.lastProduct;
    var topic = this.memory.lastTopic;
    if (matchesAny(lw, ['how much', 'price', 'cost', 'rate', 'pricing for', 'how much for it', 'how much for that'])) {
      if (product) {
        this.leadData = { product: product };
        this.currentStep = 2;
        this.addBot('Sure ' + (this.memory.name ? '<strong>' + this.memory.name + '</strong>' : '') + '! I\'ll prepare a quote for <strong>' + product + '</strong>. What quantity are you looking for?', 'quote');
        this.memory.lastTopic = 'quote'; return;
      }
    }
    if (product && topic === 'product-detail') {
      var desc = KB.products[product];
      this.addBot('\ud83d\udccc <strong>More about ' + product + '</strong><br><br>' + desc + '<br><br>We can print in bulk or small quantities with full finishing options.', 'product-detail');
      this.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udcde Call Us', '\ud83d\udcac WhatsApp']); return;
    }
    if (topic === 'services' || topic === 'prepress' || topic === 'printing' || topic === 'finishing') {
      var map = { prepress: KB.services.prepress, printing: KB.services.printing, finishing: KB.services.finishing };
      var detail = map[topic] || KB.services.printing;
      this.addBot('\ud83d\udee0\ufe0f <strong>More details on ' + topic + '</strong><br><br>' + detail.replace(/\n/g, '<br>'), 'services');
      this.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Products']); return;
    }
    this.addBot("I'm sorry, I didn't quite catch that. Could you clarify what you'd like to know more about" + (this.memory.name ? ' <strong>' + this.memory.name + '</strong>' : '') + '? Here are some options:', 'follow-up-unclear');
    this.addQuickReplies(['\ud83d\udccb Get a Quote', '\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services', '\ud83d\udccd Location']);
  };

  Chatbot.prototype.handleContextSummary = function () {
    var userTurns = this.history.filter(function (e) { return e.role === 'user'; });
    if (userTurns.length === 0) { this.addBot("We haven't discussed anything yet! What would you like to know?", 'summary'); return; }
    var summary = '\ud83d\udccb <strong>Conversation Summary</strong><br><br>';
    if (this.memory.name) summary += '\u2022 Your name: <strong>' + this.memory.name + '</strong><br>';
    if (this.memory.mentionedProducts.length > 0) summary += '\u2022 Products discussed: <strong>' + this.memory.mentionedProducts.join(', ') + '</strong><br>';
    if (this.memory.lastTopic) summary += '\u2022 Last topic: <strong>' + this.memory.lastTopic + '</strong><br>';
    summary += '\u2022 Total exchanges: <strong>' + userTurns.length + '</strong>';
    this.addBot(summary, 'summary');
    this.addBot('Is there anything specific you\'d like to continue or revisit?', 'summary');
  };

  // ── Quote Flow ──────────────────────────────────────────────────────────
  Chatbot.prototype.handleQuoteFlow = function (text) {
    var self = this;
    switch (this.currentStep) {
      case 1: {
        var trimmedName = text.trim();
        if (trimmedName.length < 2) { this.addBot("I'm sorry, could you please provide a valid <strong>Name</strong>? (At least 2 characters)", 'quote-step'); return; }
        this.leadData.name = trimmedName;
        var nm = extractName(trimmedName);
        if (nm && !this.memory.name) this.memory.name = nm;
        this.currentStep = 2;
        this.addBot('Thank you, <strong>' + trimmedName + '</strong>! Now, what is your <strong>Phone Number</strong>?', 'quote-step');
        break;
      }
      case 2: {
        var trimmedPhone = text.trim();
        var digitsOnly = trimmedPhone.replace(/\D/g, '');
        if (digitsOnly.length < 10) { this.addBot('Please provide a valid <strong>Phone Number</strong> (e.g., 10 digits) so we can reach you with the quote.', 'quote-step'); return; }
        this.leadData.phone = trimmedPhone;
        this.currentStep = 3;
        this.addBot('Great! Finally, could you please provide your <strong>Email Address</strong>?', 'quote-step');
        break;
      }
      case 3: {
        var trimmedEmail = text.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) { this.addBot('Please provide a valid <strong>Email Address</strong> (e.g., name@example.com).', 'quote-step'); return; }
        this.leadData.email = trimmedEmail;
        if (this.leadData.product) {
          this.pendingProducts = [this.leadData.product];
          this.moveToNextProductSelection();
        } else {
          this.currentStep = 4;
          this.pendingProducts = [];
          this.addBot('Got it! Now, which <strong>Category</strong> does your product belong to?', 'quote-step');
          this.addQuickReplies(PRODUCT_CATEGORIES.map(function (c) { return c.category; }));
        }
        break;
      }
      case 4: {
        var lwText = text.toLowerCase();
        var category = PRODUCT_CATEGORIES.find(function (c) { return c.category.toLowerCase() === lwText; });
        if (category) {
          this.addBot('Select the <strong>' + category.category + '</strong> products you need:', 'quote-step');
          this.addChecklist([{ category: category.category, items: category.items, hideCheckbox: false }], 'Confirm Selection', function (selected) {
            self.handleQuoteFlow(selected.join(', '));
          });
          return;
        }
        if (text.indexOf(',') !== -1 || PRODUCT_CATEGORIES.some(function (cat) { return cat.items.some(function (item) { return lwText.indexOf(item.toLowerCase()) !== -1; }); })) {
          var items = text.split(',').map(function (i) { return i.trim(); }).filter(function (i) { return i; });
          this.pendingProducts.push.apply(this.pendingProducts, items);
          this.addBot("Got it! I've added those. Would you like to select more products from another category or proceed with these?", 'quote-step');
          this.addQuickReplies(['\u2795 Select More', '\u2705 Proceed to Details']);
          return;
        }
        if (lwText === 'select more' || lwText === '\u2795 select more') {
          this.addBot('Sure! Select another category:', 'quote-step');
          this.addQuickReplies(PRODUCT_CATEGORIES.map(function (c) { return c.category; }));
          return;
        }
        if (lwText === 'proceed to details' || lwText === '\u2705 proceed to details') {
          if (this.pendingProducts.length === 0) {
            this.addBot("You haven't selected any products yet! Please pick a category:", 'quote-step');
            this.addQuickReplies(PRODUCT_CATEGORIES.map(function (c) { return c.category; }));
            return;
          }
          this.moveToNextProductSelection();
          return;
        }
        this.addBot('Please select a category from the buttons below or click Proceed:', 'quote-step');
        this.addQuickReplies(PRODUCT_CATEGORIES.map(function (c) { return c.category; }).concat(['\u2705 Proceed to Details']));
        break;
      }
      case 5: {
        var currentProduct = this.pendingProducts[0];
        if (currentProduct && this.leadData.selections) this.leadData.selections[currentProduct] = text;
        this.pendingProducts.shift();
        if (this.pendingProducts.length > 0) this.moveToNextProductSelection();
        else this.finishQuote();
        break;
      }
    }
  };

  Chatbot.prototype.moveToNextProductSelection = function () {
    var self = this;
    if (!this.leadData.selections) this.leadData.selections = {};
    var p = this.pendingProducts[0];
    var lwProduct = p.toLowerCase();
    var productDesc = KB.products[lwProduct];
    var pricingOpts = PRODUCT_PRICING_OPTIONS[lwProduct];
    this.currentStep = 5;
    if (productDesc) this.addBot('\ud83d\udcca <strong>Rate Card: ' + p + '</strong><br><br>' + productDesc, 'product-detail');
    if (pricingOpts) {
      this.addPricingOptions(pricingOpts, function (selected) { self.handleQuoteFlow(selected); });
    } else {
      this.addBot('What size or specifications do you need for <strong>' + p + '</strong>?', 'quote-step');
    }
  };

  Chatbot.prototype.finishQuote = function () {
    var self = this;
    var extractedName = this.memory.name || extractName(this.leadData.name || '') || '';

    var quotationHtml = '<div id="quotation-summary-card" style="background: white; color: #1e293b; padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); font-family: Inter, sans-serif;">' +
      '<div style="text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 15px;">' +
      '<img src="' + CONFIG.logoImage + '" alt="Logo" style="height: 40px; margin-bottom: 5px;" onerror="this.style.display=\'none\'">' +
      '<div style="font-weight: 800; font-size: 1.2rem; text-transform: uppercase; color: #1e3a8a;">' + KB.company.name + '</div>' +
      '<div style="font-size: 0.75rem; color: #64748b; line-height: 1.2;">' + KB.company.location + '<br>\ud83d\udcde ' + KB.company.phone + ' | \u2709\ufe0f ' + KB.company.email + '</div>' +
      '</div>' +
      '<div style="font-size: 0.85rem; margin-bottom: 12px;">' +
      '<div style="font-weight: 700; color: #3b82f6; text-transform: uppercase; margin-bottom: 8px; font-size: 0.75rem; border-bottom: 1px dashed #cbd5e1;">Enquiry Details</div>' +
      '<div style="line-height: 1.4;">' +
      Object.entries(this.leadData.selections || {}).map(function (entry) {
        return '<div style="margin-bottom: 8px; border-left: 3px solid #3b82f6; padding-left: 8px;"><div style="font-weight: 700; color: #1e3a8a; font-size: 0.8rem;">' + entry[0] + '</div><div style="font-size: 0.75rem; color: #475569;">' + entry[1] + '</div></div>';
      }).join('') +
      '<div style="display: grid; grid-template-columns: 85px 1fr; gap: 4px; margin-top: 8px; border-top: 1px solid #f1f5f9; padding-top: 16px;">' +
      '<span style="color: #64748b;">Customer:</span><span style="font-weight: 600;">' + this.leadData.name + '</span>' +
      '<span style="color: #64748b;">Phone:</span><span style="font-weight: 600;">' + this.leadData.phone + '</span>' +
      '<span style="color: #64748b;">Email:</span><span style="font-weight: 600; word-break: break-all;">' + this.leadData.email + '</span>' +
      '</div></div></div>' +
      '<div style="text-align: center; font-size: 0.7rem; color: #94a3b8; font-style: italic; border-top: 1px solid #f1f5f9; padding-top: 8px; margin-top: 8px;">Thank you for choosing The Printing House!</div></div>';

    this.addBot('\u2705 <strong>Quotation Generated!</strong><br>' + quotationHtml, 'quote-done');
    this.addBot((extractedName ? 'Thank you, <strong>' + extractedName + '</strong>! ' : 'Thank you! ') + 'Our sales executive will contact you shortly.<br><br>\ud83d\udcde <strong>' + KB.company.phone + '</strong>', 'quote-done');

    var waText = 'Hi! I just submitted an enquiry to The Printing House.\n\nEnquiry Items:\n' +
      Object.entries(this.leadData.selections || {}).map(function (e) { return '\u2022 ' + e[0] + ': ' + e[1]; }).join('\n') +
      '\n\nName: ' + this.leadData.name + '\nPhone: ' + this.leadData.phone + '\nEmail: ' + this.leadData.email;

    this.addBot('<a href="https://wa.me/' + KB.company.whatsapp + '?text=' + encodeURIComponent(waText) + '" target="_blank" class="cta-button" style="display:inline-block; margin-top:10px; text-decoration:none;">\ud83d\udcac Follow up on WhatsApp \u2192</a>', 'quote-done');

    // Send email via FormSubmit
    var now = new Date();
    var dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    var refNum = Math.floor(1000 + Math.random() * 9000);

    var plainTextReceipt = [
      '==========================================',
      '       THE PRINTING HOUSE - TRICHY        ',
      '          --- ENQUIRY RECEIPT ---         ',
      '==========================================',
      'Ref No : TPH-' + refNum,
      'Date   : ' + dateStr,
      '------------------------------------------',
      'CUSTOMER DETAILS:',
      'Name   : ' + this.leadData.name,
      'Phone  : ' + this.leadData.phone,
      'Email  : ' + this.leadData.email,
      '------------------------------------------',
      'ENQUIRY DETAILS:'
    ].concat(Object.entries(this.leadData.selections || {}).map(function (e) { return ' - ' + e[0] + ': ' + e[1]; })).concat([
      '------------------------------------------',
      '        Thank you for your enquiry!        ',
      '    Our team will contact you shortly.    ',
      '==========================================',
      'Shop: No 6, Race Course Road, Trichy',
      'Ph  : +91 90031 69615',
      '=========================================='
    ]).join('\n');

    var emailBody = {
      _subject: 'QUOTATION ENQUIRY [TPH-' + refNum + ']: ' + Object.keys(this.leadData.selections || {}).join(', '),
      ENQUIRY_RECEIPT: plainTextReceipt,
      Customer_Name: this.leadData.name,
      Customer_Phone: this.leadData.phone,
      Customer_Email: this.leadData.email,
      Product: this.leadData.product,
      _template: 'table'
    };

    fetch('https://formsubmit.co/ajax/aakashkummar1258@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(emailBody)
    }).then(function (r) { return r.json(); }).then(function (d) { console.log('Email sent:', d); }).catch(function (e) { console.error('Email failed:', e); });

    this.currentStep = 0;
    this.leadData = {};
    this.memory.lastTopic = 'quote-done';

    setTimeout(function () {
      self.addBot('Is there anything else I can help you with' + (self.memory.name ? ', <strong>' + self.memory.name + '</strong>' : '') + '?', 'quote-done');
      self.addQuickReplies(['\ud83d\udce6 Our Products', '\ud83d\udee0\ufe0f Our Services', '\ud83d\udccd Location & Contact']);
      var card = document.getElementById('quotation-summary-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 900);
  };

  // ── Initialize on DOM ready ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectHTML();
    new Chatbot();
  });

})();
