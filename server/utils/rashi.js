const PLANET = require('./planet')
const TATWA = require('./tatwa')

const RASHI = {
    ARIES:{
        name:'ARIES',
        type:TATWA.Fire,
        high:PLANET.SUN,
        low:PLANET.SATURN,
        lord:PLANET.MARS
    },
    TARUS:{
        name:'TARUS',
        type:TATWA.Earth,
        high:PLANET.MOON,
        low:null,
        lord:PLANET.VENUS
    },
    GEMINI:{
        name:'GEMINI',
        type:TATWA.Air,
        high:PLANET.RAHU,
        low:null,
        lord:PLANET.MERCURY
    },
    CANCER:{
        name:'CANCER',
        type:TATWA.Water,
        high:PLANET.JUPITER,
        low:PLANET.MARS,
        lord:PLANET.MOON
    },
    LEO:{
        name:'LEO',
        type:TATWA.Fire,
        high:null,
        low:null,
        lord:PLANET.SUN
    },
    VIRGO:{
        name:'VIRGO',
        type:TATWA.Earth,
        high:PLANET.MERCURY,
        low:PLANET.VENUS,
        lord:PLANET.MERCURY
    },
    LIBRA:{
        name:'LIBRA',
        type:TATWA.Air,
        high:PLANET.SATURN,
        low:PLANET.SUN,
        lord:PLANET.VENUS
    },
    SCORPIO:{
        name:'SCORPIO',
        type:TATWA.Water,
        high:null,
        low:PLANET.MOON,
        lord:PLANET.MARS
    },
    SAGITTARIUS:{
        name:'SAGITTARIUS',
        type:TATWA.Fire,
        high:null,
        low:PLANET.RAHU,
        lord:PLANET.JUPITER
    },
    CAPRICORN:{
        name:'CAPRICORN',
        type:TATWA.Earth,
        high:PLANET.MARS,
        low:PLANET.JUPITER,
        lord:PLANET.SATURN
    },
    AQUARIUS:{
        name:'AQUARIUS',
        type:TATWA.Air,
        high:null,
        low:null,
        lord:PLANET.SATURN
    },
    PISCES:{
        name:'PISCES',
        type:TATWA.Water,
        high:PLANET.VENUS,
        low:PLANET.MERCURY,
        lord:PLANET.JUPITER
    }
}

getRashi = (degree) => {
    try {
        return new Promise((res, rej) => {
            point = Math.floor(degree / 30)
            Object.keys(RASHI).forEach(async (index, value) => {
                if (point === value) {
                    let rashi = RASHI[index]
                    if(typeof rashi.type!=='string')
                        rashi.type = Object.keys(TATWA).find(key => TATWA[key] == rashi.type)
                    if(rashi.high && typeof rashi.high !=='string')
                        rashi.high = Object.keys(PLANET).find(key => PLANET[key] == rashi.high)
                    if(rashi.low && typeof rashi.low !=='string')
                        rashi.low = Object.keys(PLANET).find(key => PLANET[key] == rashi.low)
                    if(rashi.lord && typeof rashi.lord !=='string')
                        rashi.lord = Object.keys(PLANET).find(key => PLANET[key] == rashi.lord)
                    res(rashi)
                }
            })
            rej('Not found')
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {RASHI,getRashi}