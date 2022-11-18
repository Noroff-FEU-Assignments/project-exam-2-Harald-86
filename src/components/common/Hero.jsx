import banner from "../../images/pexels-grzegorz.jpg";
import Image from "react-bootstrap/Image";

export default function HeroImage() {
  return (
    <div className="hero__box">
      <Image className="hero__box--image img-fluid" src={banner} alt="" />
    </div>
  );
}
