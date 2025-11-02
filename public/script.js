const MAX_XP = 1282608999; // 1,282,608,999

function formatShortNumber(num) {
  if (num >= 1_000_000_000) {
    const billions = Math.floor(num / 1_000_000_000 * 1000) / 1000;
    return billions.toFixed(3) + 'B';
  }
  if (num >= 1_000_000) {
    const millions = Math.floor(num / 1_000_000);
    return millions + 'M';
  }
  if (num >= 1_000) {
    const thousands = Math.floor(num / 1_000);
    return thousands + 'K';
  }
  return num.toString();
}

async function updateXP() {
  try {
    const response = await fetch('/xp');
    const data = await response.json();

    if (data.total_xp !== undefined) {
      const xp = data.total_xp;
      const percent = Math.min((xp / MAX_XP) * 100, 100).toFixed(1);

      const progressBar = document.getElementById('progress-bar');
      const progressText = document.getElementById('progress-text');
      progressBar.style.width = percent + '%';

      const xpText = `${formatShortNumber(xp)} / ${formatShortNumber(MAX_XP)} (${percent}%)`;
      progressText.textContent = xpText;
    } else {
      document.getElementById('progress-text').textContent = 'Error: XP not found';
    }
  } catch (err) {
    document.getElementById('progress-text').textContent = 'Error fetching XP';
    console.error(err);
  }
}

updateXP();
setInterval(updateXP, 360000); // update every 6 minutes
