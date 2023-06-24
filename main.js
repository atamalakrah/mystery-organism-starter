// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Constructs a new P. Aqeuor object
const pAqeuorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    // Replaces a random base with another base
    mutate: function () {
      const baseToChange = Math.floor(Math.random() * this.dna.length);
      let randomBase = returnRandBase();
      while(dna[baseToChange] == randomBase){
        randomBase = returnRandBase();
      }
      dna[baseToChange] = randomBase;
      return dna;
    },
    // Compares DNA strands to see what percent match there is
    compareDNA: function (strandToCompare) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++){
        if (this.dna[i] == strandToCompare.dna[i]){
          counter += 1;
        }
      }
      let percentMatch = Math.floor((counter / this.dna.length) * 100);
      //console.log("specimen #" + this.specimenNum + " and specimen #" + strandToCompare.specimenNum + " have " + percentMatch + "% DNA in common");
      return percentMatch;
    },
    // Calculates likely hood to survive.  Defined as consisting of more than 60% C or G bases
    willLikelySurvive: function () {
      let counter = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] == 'C' || this.dna[i] == 'G'){
          counter += 1;
        }        
      }
      let percentMatch = Math.floor((counter / this.dna.length) * 100);
      if (percentMatch > 60){
        return true;
      }
      else{
        return false;
      }
    },
    //Creates a complementary strand of DNA. A:T and C:G
    complementStrand: function () {
      let compStrandArray = [];
      for(let i = 0; i < this.dna.length; i++){
        switch (this.dna[i]){
          case 'A': compStrandArray.push('T');
          break;
          case 'T': compStrandArray.push('A');
          break;
          case 'C': compStrandArray.push('G');
          break;
          case 'G': compStrandArray.push('C');
          break;
        }     
      }
      return compStrandArray;
    }
  };
}
//Creates 30 strands for testing
let pAequorStorage = [];
for(let i = 0; i < 30; i++){
  pAequorStorage.push(pAqeuorFactory(i, mockUpStrand()));
}

//Compares the 30 strands of DNA to see which 2 strands are the highest
let counterCompare = 0;
let specimen1 = '';
let specimen2 = '';
for(let j = 0; j < pAequorStorage.length; j++){
  for(let i = 0; i < pAequorStorage.length; i++){
    if(pAequorStorage[i].compareDNA(pAequorStorage[j]) > counterCompare && pAequorStorage[i].specimenNum != pAequorStorage[j].specimenNum){
      counterCompare = pAequorStorage[i].compareDNA(pAequorStorage[j]);
      specimen1 = pAequorStorage[i].specimenNum;
      specimen2 = pAequorStorage[j].specimenNum;
    }
}
}
console.log("Specimen #" + specimen1 + " and Specimen #" + specimen2 + " have the highest match percentage, " + counterCompare + "%.");




