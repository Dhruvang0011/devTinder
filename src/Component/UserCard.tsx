const UserCard = ({ user }) => {
  return (
    <div className="relative w-96 h-[550px] rounded-xl overflow-hidden shadow-lg m-10">

      {/* Background Image */}
      <img
        src={user.photoUrl}
        alt="User"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 w-full p-5 text-neutral-200 space-y-2">

        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
        </h2>

        <p className="text-sm opacity-80">
          Age: {user.age}
        </p>

        <p className="text-sm line-clamp-2">
          {user.about}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {user.skil?.map((s, index) => (
            <span
              key={index}
              className="
                px-3 py-1 text-xs font-medium rounded-full
                bg-white/20 backdrop-blur-md
                border border-white/30
                text-white
                hover:bg-white hover:text-black
                transition-all duration-300
              "
            >
              {s}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">

          <button className="
            flex-1 py-2 rounded-lg
            bg-gradient-to-r from-green-500 to-emerald-600
            text-white font-semibold
            hover:scale-105 transition-transform
          ">
            Send Request
          </button>

          <button className="
            flex-1 py-2 rounded-lg
            bg-black/60 border border-white/30
            text-white font-semibold
            hover:bg-red-500 hover:border-none
            transition-all
          ">
            Ignore
          </button>

        </div>

      </div>
    </div>
  );
};

export default UserCard;
