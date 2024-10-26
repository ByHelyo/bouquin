import logo from "/icon/32.png";

const Logo: React.FC = () => {
  return (
    <div className="align-center flex select-none items-center justify-center gap-x-2 p-4 text-lg">
      <img src={logo} />
      <div className="text-xl font-bold">Bouquin</div>
    </div>
  );
};

export default Logo;
