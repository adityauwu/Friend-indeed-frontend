
interface Props {
   
   
    symbol? :any;
    label? : any;
   
  }


export default function Emoji(props: Props) {
    const {symbol, label } = props; 
    <span
        className="emoji"
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
    >
        😻 
    </span>

}


