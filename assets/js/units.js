// units.js

const unitData = {
    ba_captain: {
        name: "Blood Angels Captain",
        points: 120,
        defaultRange: "heavy_bolt_pistol",
        defaultMelee: ""
    },
    mephiston: {
        name: "Chief Librarian Mephiston",
        points: 140
    },
    captain_gravis:{
        name: "Captain in Gravis armor",
        points: 80
    },
    captain_terminator:{
        name: "Captain in Terminator armor",
        points: 95,
        defaultMelee: "relic_weapon",
        defaultRange: "storm_bolter"
    },
    caplain:{
        name: "Caplain",
        points: 60
       // defaultRange: "absolver_bolt_pistol",
       // defaultMelee: "crozius_arcanum",
    }
};

// Делаем доступным глобально
window.unitData = unitData;