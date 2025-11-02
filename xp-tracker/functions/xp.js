export async function onRequest(context) {
  try {
    const res = await fetch("https://wort.gg/api/stats/FieyerFox/multiplayer");
    const data = await res.json();
    return Response.json({ total_xp: data.xp.total });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
