import { useState } from "react";


function CustomHook(){

    // custom hook
    const useInput = (initValue = null) =>{
        const [value, setter] = useState(initValue);
        const handler = (e)=>{
            setter(e.target.value);
        }
        return [value,handler];
    }

    return useInput;
}

export default CustomHook();