import Lottie from "react-lottie";
import animationData from "../../../assets/animations/loading-dots-blue.json";

export default function CustomLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      }}
      height={400}
      width={400}
    />
  );
}
