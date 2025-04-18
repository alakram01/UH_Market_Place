'use client';

import { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type ScrollFadeInProps = {
  children: ReactNode;
  delay?: number;
};

export default function ScrollFadeIn({ children, delay = 0 }: ScrollFadeInProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
        controls.start("hidden");
      }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

//'use client';

// import { ReactNode, useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// type ScrollFadeInProps = {
//   children: ReactNode;
//   delay?: number;
// };

// export default function ScrollFadeIn({ children, delay = 0 }: ScrollFadeInProps) {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 40 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: { duration: 0.8, delay },
//         },
//       }}
//     >
//       {children}
//     </motion.div>
//   );
// }
