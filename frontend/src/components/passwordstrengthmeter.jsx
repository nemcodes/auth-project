import { Check, X } from "lucide-react";

const PasswordCriteria = ({password})=>{
  const criteria = [
    {label:"At least 6 characters", met: password.length >= 6},
    {label:"At least one uppercase letter", met: /[A-Z]/.test(password)},
    {label:"At least one lowercase letter", met: /[a-z]/.test(password)},
    {label:"At least one number", met: /\d/.test(password)},
    {label:"At least one special character", met: /[^A-Za-z0-9]/.test(password)},
  ];
  return( <div className="mt-2 space-y-1"> 
  {criteria.map((item)=>(
     <div key={item.label} className="flex items-center text-xs"> 
    {item.met ? (<Check className="size-4 text-purple-500 mr-2"/>

    ) : (
      <X className="size-4 text-red-500 mr-2"/>
      )}
    <span className={item.met ? "text-purple-500" : "text-gray-700"}>{item.label}</span>
  </div>

  ))}
  
  
  </div>)
}


const Passwordstrengthmeter = ({password}) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength ++;
    if(pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength ++;
    if (pass.match(/\d/)) strength ++;
    if (pass.match(/[^A-Za-z0-9]/)) strength ++;
    return strength;
  };

  const strength = getStrength(password);
  const getColor = (strength) => { 
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-orange-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-blue-500";
    if (strength === 4) return "bg-purple-500";
    return "bg-gray-300";
  };



const getStrengthText = (strength) => {

switch (strength) {
  case 0:
    return "Very Weak";
  case 1:
    return "Weak";
  case 2:
    return "Moderate";
  case 3:
    return "Good";
  default:
    return "Strong";
};


  };
  return (  
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-muted-foreground">Password Strength</span>
        <span className='text-xs text-gray-400'>  { getStrengthText(strength)} </span>
    </div>
    <div className="flex space-x-1">
      { [...Array(4)].map((_, index) => (
        <div key={index} className={`h-2 flex-1 rounded transition-colors duration-300 
          ${index < strength ? getColor(strength) : 'bg-gray-600'}`}/>
      ))}
    </div>
    <PasswordCriteria password={password}/>
    </div>
  );
};

export default Passwordstrengthmeter;
  