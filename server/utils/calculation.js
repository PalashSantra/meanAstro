const swisseph = require('swisseph')
const TATWA = require('./tatwa')
const {RASHI,getRashi} = require('./rashi')
const NAKSHATRA = require('./nakshatra')
const PLANET = require('./planet')
const LORD = require('./lord')

const config = {
    AYANAMSA: swisseph.SE_SIDM_LAHIRI,
    EPH_FLAGS: swisseph.SEFLG_SIDEREAL,
    HOUSE_SYSTEM: 'PLACIDUS'
}

const birthDetails = {
    year: 1993,
    month: 4,
    date: 9,
    hour: 20,
    min: 38,
    sec: 0,
    timezone: 5.5,
    longitude: '88.2636'
}

const initialize = (birthDetails) => {
    let { utc, retval, et, tt } = convertTime(birthDetails)
    swisseph.swe_set_sid_mode(config.AYANAMSA, 0, 0)
    ayanamsa = swisseph.swe_get_ayanamsa_ut(tt);
    console.log('Ayanamsa :', ayanamsa)
    return { utc, retval, et, tt }
}



getNakshatra = (degree) => {
    return new Promise((res, rej) => {
        point = Math.floor(degree / 13.3333)
        Object.keys(NAKSHATRA).forEach((index, value) => {
            if (point === value) {
                let obj = {
                    name:Object.keys(NAKSHATRA).find(key => NAKSHATRA[key] === (value+1)),
                    lord:LORD.find(x=>x.nakshatra.includes((value+1))).name
                }
                res(obj)
            }
        })
        rej(point+'Not found')
    })
}


const getPlanetDetails = async () => {
    try {
        let planets = []
        let { utc, retval, et, tt } = initialize(birthDetails)
        for (let i = swisseph.SE_SUN; i < 11; i++) {
            let rtnFlag = swisseph.swe_calc_ut(tt, i, config.EPH_FLAGS)
            let degree = swisseph.swe_degnorm(rtnFlag.longitude)
            planets.push({
                planet: Object.keys(PLANET).find(key=>PLANET[key]==i),
                degree: degree.x360,
                normalizedDegree: degree.x360 % 30,
                isRetrograde:rtnFlag.longitudeSpeed<0?true:false,
                positedRashi: await getRashi(degree.x360),
                positedNakshatra: await getNakshatra(degree.x360)
            })
        }
        //KETU
        let degree = Math.abs(planets.find(x=>x.planet==='RAHU').degree - 180)
        planets.push({
            planet: Object.keys(PLANET).find(key=>PLANET[key]===11),
            degree: degree,
            normalizedDegree: degree % 30,
            isRetrograde:true,
            positedRashi: await getRashi(degree),
            positedNakshatra: await getNakshatra(degree)
        })
        //RAHU
        planets.find(x=>x.planet==='RAHU')['isRetrograde']=true
        console.log(planets)
    } catch (error) {
        console.log(error)
    }

    //console.log(planets)
}

const convertTime = (birthDetails) => {
    try {
        let timeDiff = (4 * birthDetails.longitude) / 60 //In hour -> proper timezone diff
        let utc = swisseph.swe_utc_time_zone(birthDetails.year, birthDetails.month, birthDetails.date, birthDetails.hour, birthDetails.min, birthDetails.sec, timeDiff);
        let retval = swisseph.swe_utc_to_jd(utc.year, utc.month, utc.day, utc.hour, utc.minute, utc.second, swisseph.SE_GREG_CAL);
        let et = retval.julianDayET;
        tt = retval.julianDayUT;
        return { utc, retval, et, tt };
    } catch (error) {
        throw error
    }
};

getPlanetDetails()
//console.log(getGrahasPosition(birthDetails))