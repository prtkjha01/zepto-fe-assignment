import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { Recommendation } from "../types/recommendations";
import recommendationData from "../constants/constants";
const inter = Inter({ subsets: ["latin"] });

/**
 * Renders the Home component.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = (): JSX.Element => {
  const [showList, setShowList] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [bkspCount, setBkspCount] = useState<number>(0);
  const [chips, setChips] = useState<Recommendation[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [recommendations, setRecommendations] =
    useState<Recommendation[]>(recommendationData);

  const filteredRecommendations = recommendations.filter((rec) =>
    rec.name.trim().toLowerCase().includes(nameInput.trim().toLowerCase())
  );

  useEffect(() => {
    // console.log(bkspCount);

    let newChips = [...chips];
    if (bkspCount == 1 && chips.length && !nameInput.length) {
      newChips[newChips.length - 1].isHighlighted = true;

      setChips(newChips);
    }

    if (bkspCount == 2 && chips.length && !nameInput.length) {
      setRecommendations([
        ...recommendations,
        { ...newChips[newChips.length - 1], isHighlighted: false },
      ]);
      newChips.pop();
      setChips(newChips);
      setBkspCount(0);
    }
  }, [bkspCount]);

  /**
   * Handles the keydown event for the input.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event object.
   * @return {void} No return value.
   */
  const handleInputKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !nameInput.length) {
      setBkspCount(bkspCount + 1);
    } else if (
      e.key === "Enter" &&
      nameInput.length &&
      filteredRecommendations.length
    ) {
      setChips([...chips, filteredRecommendations[highlightedIndex]]);
      const index: number = recommendations.indexOf(filteredRecommendations[0]);
      const newRec: Recommendation[] = recommendations;
      newRec.splice(index, 1);
      setRecommendations(newRec);
      setNameInput("");
      setShowList(false);
    } else if (
      e.key === "ArrowDown" &&
      nameInput.length &&
      filteredRecommendations.length
    ) {
      setHighlightedIndex(
        (highlightedIndex + 1) % filteredRecommendations.length
      );
    } else if (
      e.key === "ArrowUp" &&
      nameInput.length &&
      filteredRecommendations.length
    ) {
      if (highlightedIndex < 0) {
        setHighlightedIndex(filteredRecommendations.length - 1);
      } else {
        setHighlightedIndex(
          (highlightedIndex - 1) % filteredRecommendations.length
        );
      }
    }
  };

  /**
   * Adds the given recommendation to the chips array, removes it from the recommendations array,
   * clears the name input, and hides the recommendation list.
   *
   * @param {recommendation} rec - The recommendation to be added to the chips array.
   */
  const handleListItemClick = (rec: Recommendation) => {
    setChips([...chips, rec]);
    const index: number = recommendations.indexOf(rec);
    const newRec: Recommendation[] = recommendations;
    newRec.splice(index, 1);
    setRecommendations(newRec);
    setNameInput("");
    setShowList(false);
  };

  /**
   * Handles the removal of a chip.
   *
   * @param {recommendation} chip - The chip to be removed.
   * @return {void} This function does not return a value.
   */
  const handleChipRemoval = (chip: Recommendation): void => {
    setRecommendations([...recommendations, chip]);
    const index: number = chips.indexOf(chip);
    let newChips: Recommendation[] = chips;
    newChips.splice(index, 1);
    setChips(newChips);
    setBkspCount(0);
  };
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="https://yt3.googleusercontent.com/GTLfQAfTG92vSe2IrcPojos1EuA2AtLwgFUfUKaz31iVqkYw2d7e1-HO5yCsDeLdBlb--ZD7bQ=s176-c-k-c0x00ffffff-no-rj"
          sizes="any"
        />
        <title>Zepto Assignment | Prateek Jha</title>
      </Head>
      <main>
        <div
          className="flex justify-center mb-36"
          style={{ backgroundColor: "#3c006b " }}
        >
          <h1
            className="text-[40px] flex items-center gap-2 text-white text-center font-bold   py-8 px-5"
            style={{ backgroundColor: "#3c006b " }}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="164"
                height="54"
                fill="none"
                viewBox="0 0 164 54"
              >
                <path
                  fill="url(#paint0_linear_22971_8319)"
                  fill-rule="evenodd"
                  d="M104 12.079a3.23 3.23 0 0 1 2.007-3.014 3.222 3.222 0 0 1 1.25-.238h2.293V4.044a3.529 3.529 0 0 1 .109-1.502A3.53 3.53 0 0 1 111.585.32a3.538 3.538 0 0 1 4.866 2.222c.143.487.18.999.109 1.502v4.783h7.453a3.222 3.222 0 0 1 3.257 3.252 3.264 3.264 0 0 1-3.257 3.251h-7.453v11.517c0 5.616 3.124 8.487 7.453 8.487a3.284 3.284 0 0 1 3.283 3.286 3.284 3.284 0 0 1-3.283 3.287c-8.223 0-14.463-5.803-14.463-15.06V15.33h-2.293A3.264 3.264 0 0 1 104 12.079ZM31.619 25.43c.025-3.219.96-6.364 2.693-9.07a16.931 16.931 0 0 1 7.101-6.215 16.821 16.821 0 0 1 9.306-1.432 16.859 16.859 0 0 1 8.625 3.795 3.691 3.691 0 0 1 1.266 2.652 3.661 3.661 0 0 1-1.02 2.554l-9.74 11.658a2.94 2.94 0 0 1-2.408 1.15 3.105 3.105 0 0 1-2.332-.873 3.138 3.138 0 0 1-.956-2.31 2.88 2.88 0 0 1 .756-2.103l7.665-9.033a7.73 7.73 0 0 0-4.175-1.15c-5.441 0-9.749 4.588-9.749 10.377 0 5.79 4.246 10.377 9.749 10.377a9.048 9.048 0 0 0 3.653-.73 9.09 9.09 0 0 0 3.054-2.143c.134-.108.262-.216.387-.32v-.002h.001c.82-.688 1.502-1.26 2.654-1.26a3.263 3.263 0 0 1 2.435.939 3.298 3.298 0 0 1 .984 2.429 3.713 3.713 0 0 1-1.02 2.289 15.74 15.74 0 0 1-5.492 4 15.66 15.66 0 0 1-6.656 1.303 16.447 16.447 0 0 1-6.465-1.215 16.52 16.52 0 0 1-5.481-3.653 16.624 16.624 0 0 1-3.63-5.513 16.697 16.697 0 0 1-1.205-6.5Zm-13.573-9.784H3.986a3.252 3.252 0 0 1-2.289-.96 3.289 3.289 0 0 1-.955-2.302 3.243 3.243 0 0 1 .94-2.317 3.207 3.207 0 0 1 2.304-.945h21.059a3.193 3.193 0 0 1 2.304.945 3.23 3.23 0 0 1 .94 2.317 3.404 3.404 0 0 1-1.017 2.302L10.154 35.235h14.89a3.194 3.194 0 0 1 2.305.945 3.229 3.229 0 0 1 .94 2.317 3.289 3.289 0 0 1-.956 2.301c-.607.61-1.43.956-2.288.96H3.243a3.27 3.27 0 0 1-2.305-.987A3.307 3.307 0 0 1 0 38.435a3.494 3.494 0 0 1 .955-2.311l17.09-20.477Zm56.99 35.307V38.446a15.817 15.817 0 0 0 10.557 3.953c9.162 0 16.097-7.464 16.097-16.914 0-9.45-6.935-16.915-16.097-16.915a15.527 15.527 0 0 0-10.557 4.016v-.443a3.55 3.55 0 0 0-1.182-2.178 3.527 3.527 0 0 0-4.632 0 3.55 3.55 0 0 0-1.182 2.178v38.811c.12.846.54 1.619 1.182 2.178a3.527 3.527 0 0 0 4.632 0 3.55 3.55 0 0 0 1.182-2.178Zm9.798-35.877c5.468 0 9.797 4.468 9.797 10.408 0 5.94-4.329 10.407-9.797 10.407-5.469 0-9.798-4.468-9.798-10.407v-.452c.195-5.674 4.33-9.956 9.798-9.956Zm48.354.992a16.905 16.905 0 0 0-2.836 9.373 16.623 16.623 0 0 0 4.84 12.02 16.53 16.53 0 0 0 5.5 3.65 16.49 16.49 0 0 0 6.484 1.203c3.328 0 6.58-.99 9.347-2.843a16.857 16.857 0 0 0 6.196-7.573 16.914 16.914 0 0 0 .958-9.748 16.887 16.887 0 0 0-4.605-8.64 16.803 16.803 0 0 0-8.614-4.617 16.778 16.778 0 0 0-9.72.96 16.83 16.83 0 0 0-7.55 6.215Zm13.988-1.008c5.582 0 9.779 4.651 9.779 10.381 0 5.669-4.189 10.382-9.779 10.382s-9.778-4.651-9.778-10.381 4.197-10.382 9.778-10.382Z"
                  clip-rule="evenodd"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_22971_8319"
                    x1="68.716"
                    x2="76.945"
                    y1="9.595"
                    y2="57.775"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#FF3269" />
                    <stop offset="1" stop-color="#FF794D" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span>Frontend Assignment</span>
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="flex border-slate-300  border-b-2 justify-center gap-2 p-2">
            {chips.length > 0 && (
              <ul className="flex gap-2 tag-list">
                {chips.map((chip) => (
                  <li
                    key={chip.id}
                    className={`tag flex items-center gap-2  text-slate-600  pr-3 rounded-full ${
                      chip.isHighlighted
                        ? "bg-slate-300 outline outline-2 outline-slate-400"
                        : "bg-slate-200"
                    }`}
                  >
                    <img
                      src={chip.image}
                      className="h-10 w-10 p-1 object-cover rounded-full"
                      alt={chip.name}
                    />

                    <span>{chip.name}</span>
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        handleChipRemoval(chip);
                      }}
                    >
                      <svg
                        fill="#475569"
                        height="12px"
                        width="12px"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 490 490"
                        xmlSpace="preserve"
                      >
                        <polygon
                          points="
                      456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 
	                    489.292,457.678 277.331,245.004 489.292,32.337 "
                        />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <input
              className="outline-none text-slate-600"
              type="text"
              value={nameInput}
              placeholder="Enter a name"
              onChange={(e) => {
                setNameInput(e.target.value);
                setShowList(true);
              }}
              onKeyDown={(e) => {
                handleInputKeydown(e);
              }}
            />
          </div>
        </div>
        {showList && nameInput?.length !== 0 && (
          <div className=" flex justify-center">
            <div className="list shadow-lg mt-1 ">
              <ul className=" w-auto max-h-96 overflow-y-scroll">
                {filteredRecommendations.map((rec, index) => (
                  <li
                    key={rec.id}
                    className={`flex items-center gap-2 cursor-pointer text-slate-600 py-1 px-3 mb-2 ${
                      index === highlightedIndex ? "bg-slate-300" : "bg-white"
                    }`}
                    onClick={() => {
                      handleListItemClick(rec);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={rec.image}
                        className="h-10  w-10 object-cover rounded-full"
                        alt={rec.name}
                      />
                      <div>
                        <p className="text-[16px]">{rec.name}</p>
                        <p className="text-[12px]">{rec.catchphrase}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
