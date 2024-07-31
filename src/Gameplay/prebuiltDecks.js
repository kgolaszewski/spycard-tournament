import bestiary from './SpyCards_Bestiary';

let b = bestiary

// Thuglife Cards
let [
  // eslint-disable-next-line no-unused-vars
    thief, bandit, burglar, astotheles, scarlet, king, ultimax_tank,
    // eslint-disable-next-line no-unused-vars
    chomper, chomper_brute, mother_chomper, zombeetle, belostoss, riz, spider, 
    wasp_trooper, underling, zasp, mothiva, leafbug_archer, leafbug_ninja, leafbug_clubber,
    // eslint-disable-next-line no-unused-vars
    tidal_wyrm, devourer, seedling_king, false_monarch, peacock_spider,
    // eslint-disable-next-line no-unused-vars
    mender, weevil, seedling, dune_scorpion, golden_seedling, kabbu, heavy_drone_bee,
    // eslint-disable-next-line no-unused-vars
    security_turret, krawler, warden, bee_boop, numbnail
  ] = [
    "Thief", "Bandit", "Burglar", "Astotheles", "Scarlet", "The Everlasting King", "Ultimax Tank",
    "Chomper","Chomper Brute","Mother Chomper", "Zombeetle", "Belostoss", "Riz", "Spider", 
    "Wasp Trooper", "Underling", "Zasp", "Mothiva", "Leafbug Archer", "Leafbug Ninja", "Leafbug Clubber",
    "Tidal Wyrm", "Devourer", "Seedling King", "False Monarch", "Peacock Spider",
    "Mender", "Weevil", "Seedling", "Dune Scorpion", "Golden Seedling", "Kabbu", "Heavy Drone B-33",
    "Security Turret", "Krawler", "Warden", "Bee-Boop", "Numbnail",
  ].map(e => b[e])


const prebuilts = {
  thuglife: [
    thief, thief, thief, thief, bandit, bandit, bandit, bandit, 
    burglar, burglar, burglar, golden_seedling, astotheles, scarlet, ultimax_tank,
  ],

  thug2: [
    thief, thief,  numbnail, numbnail, bandit, bandit, bandit, bandit, 
    burglar, burglar, burglar, golden_seedling, astotheles, scarlet, ultimax_tank,
  ],

  starter_deck: [
    chomper, chomper, chomper, chomper, underling, underling, underling, underling, 
    wasp_trooper, wasp_trooper, wasp_trooper, wasp_trooper, zasp, mothiva, spider
  ],

  leafthug: [
    ultimax_tank, zasp, mothiva, leafbug_archer, leafbug_archer, leafbug_archer, thief, thief, 
    leafbug_ninja, leafbug_ninja, leafbug_ninja, leafbug_clubber, leafbug_clubber, bandit, bandit,
  ],

  degenlife: [
    mender, mender, mender, mender, krawler, krawler, krawler, krawler, 
    warden, warden, warden, warden, scarlet, dune_scorpion, heavy_drone_bee,
  ],

  chomp: [
    chomper, chomper, chomper, chomper, chomper,  bandit, bandit, 
    chomper_brute, chomper_brute, chomper_brute, chomper_brute,
    golden_seedling, scarlet, dune_scorpion, mother_chomper,
  ],

  chomp2: [
    chomper, chomper, chomper, chomper, chomper, bandit, bandit, 
    chomper_brute, chomper_brute, chomper_brute, zombeetle, zombeetle, 
    scarlet, riz, mother_chomper,
  ],
}
export default prebuilts;