 const compassCircle = document.querySelector(".compass-circle");
    const myPoint = document.querySelector(".my-point");
    const startBtn = document.querySelector(".start-btn");
    const degree = document.querySelector(".degree");
    
    let compassangle = document.querySelector(".compassangle");
    
    let latlong =document.getElementById("latlong");

    // Predefined bearing in degrees
let predefinedBearing =10 ; // Change this to your desired bearing


function getVal() {
  const val = degree.value;
  predefinedBearing = val ;
  console.log(predefinedBearing);
};


function updateConicGradient(startAngle, endAngle, sectorColor) {
        myPoint.style.setProperty('--start-angle', `${startAngle}deg`);
        myPoint.style.setProperty('--end-angle', `${endAngle}deg`);
        myPoint.style.setProperty('--sector-color', sectorColor);
    }





    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    function init() {

      degree.addEventListener("blur" , getVal );
      startBtn.addEventListener("click", startCompass);
      navigator.geolocation.getCurrentPosition(locationHandler);

      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }
    }

    
    function startCompass() {

 


      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            } else {
              alert("has to be allowed!");
            }
          })
          .catch(() => alert("not supported"));
      }
    }

    function handler(e) {
      let userOrientation = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      compassangle.innerText = userOrientation + "°";
      
     console.log(compassangle.innerText);
      let orientationDifference = Math.abs(predefinedBearing - userOrientation);
      console.log(orientationDifference);
 
      compassCircle.style.transform = `translate(-50%, -50%) rotate(${-userOrientation}deg)`;
      updateConicGradient(predefinedBearing, -orientationDifference,  (orientationDifference < -5 || orientationDifference > 5)? 'red':'transparent');
      
      
    
      // Adjust the threshold as needed
      if (orientationDifference < -5 || orientationDifference > 5) {
       
        myPoint.style.opacity = 10;
      } else {
        
        myPoint.style.opacity = 10;
      }
    }


    function locationHandler(position) {
   
     latlong.innerHTML = "Lat: " + position.coords.latitude +
  "<br>Lng: " + position.coords.longitude;
   
   
    }

  

    init();
