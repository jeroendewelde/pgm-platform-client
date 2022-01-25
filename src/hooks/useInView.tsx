import { useEffect } from "react";
import { useAnimation } from "framer-motion";

const useInViewObserver = (inView: boolean) => {
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      animation.start({
        opacity: 0,
        y: 100,
        transition: {
          duration: 1,
          type: "spring",
          bounce: 0.3,
        },
      });
    }
  }, [inView, animation]);

  return animation;
};

export default useInViewObserver;
