export default function Loader({ size = "medium" }) {
    const sizeClass = {
      small: "w-4 h-4",
      medium: "w-8 h-8",
      large: "w-12 h-12",
    };
  
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${sizeClass[size]} animate-spin rounded-full border-4 border-t-transparent`}
        ></div>
      </div>
    );
  }
  