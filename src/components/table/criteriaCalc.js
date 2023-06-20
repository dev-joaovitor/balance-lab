 // inmetro criteria
 export default function criteriaCalc(weights, userData) {
    const { p1, p2, p3, p4 } = weights;
    const { volume, tolerance, density } = userData;

    const v = [];
    const d = [];
    const calcVolume = [];
    const indivAccCriteria = [];
    const di2Sample = [];
    const qnValue = volume - tolerance;

    for (let n = 0; n < 6; n++) {
      v.push((p1[n] - p2[n] - p3[n] + p4[n])/density);
      d.push((p1[n] - p3[n])/v[n]);
    }

    const avgD = d.reduce((prev, curr) => prev + curr)/6;

    for (let n = 0; n < 20; n++) {
      calcVolume.push((p1[n] - p3[n])/avgD);
      indivAccCriteria.push(calcVolume[n] > qnValue ? "OK" : "NOK");
    }

    const indivVolConformity = indivAccCriteria.every(e => e === "OK") ? "OK" : "NOK";
    const avgVolume = calcVolume.reduce((prev, curr) => prev + curr)/20;

    for (let n = 0; n < 20; n++) {
      di2Sample.push(Math.pow((calcVolume[n] - avgVolume), 2));
    }

    const diSum = di2Sample.reduce((prev, curr) => prev + curr)/19;
    const standardDeviation = Math.pow(diSum, 0.5);
    const avgVolCriteria = volume - (0.485 * standardDeviation);
    const avgVolConformity = avgVolume >= avgVolCriteria ? "OK" : "NOK";

    return [indivVolConformity, avgVolConformity];
}