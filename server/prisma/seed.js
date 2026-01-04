const { PrismaClient } = require('../prisma/generated');

const prisma = new PrismaClient();

async function main() {
  await prisma.match.createMany({
    data: [
      // ===================== 🏏 CRICKET (4) =====================
      {
        sport: "Cricket",
        league: "IPL",
        team_a: "Chennai Super Kings",
        team_b: "Mumbai Indians",
        start_time: new Date("2026-01-05T14:00:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382134/Other/bd217b22be0ebed920a66f15456d6805_fjcwkk.jpg",
      },
      {
        sport: "Cricket",
        league: "IPL",
        team_a: "Royal Challengers Bangalore",
        team_b: "Kolkata Knight Riders",
        start_time: new Date("2026-01-06T14:00:00Z"),
        is_live: true,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382268/Other/rcb-vs-kkr-dream11-prediction-royal-challengers-bengaluru-vs-kolkata-knight-riders-dream11-team-ipl-2025-match-no-58_khfdku.jpg",
      },
      {
        sport: "Cricket",
        league: "ICC World Cup",
        team_a: "India",
        team_b: "Australia",
        start_time: new Date("2026-01-07T09:30:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382420/Other/801413-india-vs-australia-1_vgmbpl.jpg",
      },
      {
        sport: "Cricket",
        league: "The Ashes",
        team_a: "England",
        team_b: "Australia",
        start_time: new Date("2026-01-08T10:00:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382707/Other/engvsausi24_live_2t20_11sep_landscape_thumb_dqydg1.jpg"
      },

      // ===================== ⚽ FOOTBALL (4) =====================
      {
        sport: "Football",
        league: "EPL",
        team_a: "Manchester United",
        team_b: "Liverpool",
        start_time: new Date("2026-01-05T18:30:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382844/Other/liverpool-v-man-utd-preview_st9eav.jpg"
      },
      {
        sport: "Football",
        league: "La Liga",
        team_a: "Real Madrid",
        team_b: "Barcelona",
        start_time: new Date("2026-01-06T20:00:00Z"),
        is_live: true,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767382942/Other/17227202414043_ymegft.jpg"
      },
      {
        sport: "Football",
        league: "Serie A",
        team_a: "Juventus",
        team_b: "AC Milan",
        start_time: new Date("2026-01-07T19:45:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383021/Other/Juventus_20vs._20Milan_20preview_ejj3ui.jpg"
      },
      {
        sport: "Football",
        league: "Bundesliga",
        team_a: "Bayern Munich",
        team_b: "Borussia Dortmund",
        start_time: new Date("2026-01-08T17:30:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383109/Other/10-15-25-Bundesliga_2025_TuneIn_MW7_KA_FCBBVB_3840x2160_ENG-1920x1080_awan8g.jpg"
      },

      // ===================== 🎾 TENNIS (4) =====================
      {
        sport: "Tennis",
        league: "Australian Open",
        team_a: "Novak Djokovic",
        team_b: "Carlos Alcaraz",
        start_time: new Date("2026-01-09T04:00:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383176/Other/hq720_xbeu46.jpg"
      },
      {
        sport: "Tennis",
        league: "Australian Open",
        team_a: "Rafael Nadal",
        team_b: "Daniil Medvedev",
        start_time: new Date("2026-01-10T06:00:00Z"),
        is_live: true,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383229/Other/hq720_pv5ldf.jpg"
      },
      {
        sport: "Tennis",
        league: "Wimbledon",
        team_a: "Jannik Sinner",
        team_b: "Alexander Zverev",
        start_time: new Date("2026-01-11T12:00:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383320/Other/01k126csyw24yr5frpmp_qhajge.jpg"
      },
      {
        sport: "Tennis",
        league: "US Open",
        team_a: "Taylor Fritz",
        team_b: "Stefanos Tsitsipas",
        start_time: new Date("2026-01-12T01:30:00Z"),
        is_live: false,
        thumbnail: "https://res.cloudinary.com/dooxbo8sg/image/upload/v1767383395/Other/hq720_w7cc8a.jpg"
      },
    ],
  });

  console.log("✅ Seeded 12 matches (4 per sport)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
