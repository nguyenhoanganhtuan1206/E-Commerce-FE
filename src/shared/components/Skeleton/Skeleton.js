import { Skeleton } from "@mui/material";

const CustomSkeleton = ({
  times,
  variant,
  width,
  height,
  style,
  className,
}) => {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <Skeleton
          animation="wave"
          className={className}
          variant={variant}
          width={width}
          height={height}
          style={style}
        />
      );
    });

  return boxes;
};

export default CustomSkeleton;
