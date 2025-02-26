import { Separator } from "components/Separator";

export const Group = ({children}) => {
    return (
      <div className="-my-10 mt-[-60px]">
        <Separator/>
        {children} 
      </div>  
    );
}