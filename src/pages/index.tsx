import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { recommendation } from "../types/recommendations";
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
  const [chips, setChips] = useState<recommendation[]>([]);
  const [recommendations, setRecommendations] =
    useState<recommendation[]>(recommendationData);

  const filteredRecommendations = recommendations.filter((rec) =>
    rec.name.toLowerCase().includes(nameInput.toLowerCase())
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
      setChips([...chips, filteredRecommendations[0]]);
      const index: number = recommendations.indexOf(filteredRecommendations[0]);
      const newRec: recommendation[] = recommendations;
      newRec.splice(index, 1);
      setRecommendations(newRec);
      setNameInput("");
      setShowList(false);
    }
  };

  /**
   * Adds the given recommendation to the chips array, removes it from the recommendations array,
   * clears the name input, and hides the recommendation list.
   *
   * @param {recommendation} rec - The recommendation to be added to the chips array.
   */
  const handleListItemClick = (rec: recommendation) => {
    setChips([...chips, rec]);
    const index: number = recommendations.indexOf(rec);
    const newRec: recommendation[] = recommendations;
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
  const handleChipRemoval = (chip: recommendation): void => {
    setRecommendations([...recommendations, chip]);
    const index: number = chips.indexOf(chip);
    let newChips: recommendation[] = chips;
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
        <h1 className="text-[40px] text-center font-bold mt-12 mb-36">
          Zepto FE Assignment
        </h1>

        <div className="flex justify-center">
          <div className="flex border-slate-300  border-b-2 justify-center gap-2 p-2">
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
              <ul className="w-96">
                {filteredRecommendations.map((rec, index) => (
                  <li
                    key={rec.id}
                    className={`flex items-center gap-2 cursor-pointer text-slate-600 py-1 px-3 mb-2 ${
                      !index ? "bg-slate-300" : "bg-white"
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
