import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Browse = () => {
  const [listings, setListings] = useState(null);
  const [filteredListings, setFilteredListings] = useState([]);
  const [savedSet, setSavedSet] = useState(new Set());

  const [distance, setDistance] = useState(null);
  const [rentMax, setRentMax] = useState(null);
  const [roomType, setRoomType] = useState(null);

  const dummyData = [
    {
      title: "4 Bed 2 Bath Plaza Verde",
      imageURL:
        "data:image/jpeg;base64,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",
      description:
        "A cozy single room in an apartment of 3 other girls, looking for a fourth housemate.",
      addressLine: "1234 Arroyo Drive",
      addressCity: "Irvine",
      addressState: "CA",
      addressZip: "92612",
      university: "UC Irvine",
      type: "apartment",
      monthlyRent: 1100,
      bedrooms: 4,
      bathrooms: 2,
      roomType: "single",
      seller: {
        name: "Ice Spice",
      },
      tags: ["Pet-Friendly", "All-Female Household"],
    },
    {
      title: "4 Bed 2 Bath Plaza Verde",
      imageURL:
        "data:image/jpeg;base64,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",
      description:
        "A cozy single room in an apartment of 3 other girls, looking for a fourth housemate.",
      addressLine: "1234 Arroyo Drive",
      addressCity: "Irvine",
      addressState: "CA",
      addressZip: "92612",
      university: "UC Irvine",
      type: "apartment",
      monthlyRent: 1100,
      bedrooms: 4,
      bathrooms: 2,
      roomType: "single",
      seller: {
        name: "Ice Spice",
      },
      tags: ["Pet-Friendly", "All-Female Household"],
    },
    {
      title: "4 Bed 2 Bath Plaza Verde",
      imageURL:
        "data:image/jpeg;base64,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",
      description:
        "A cozy single room in an apartment of 3 other girls, looking for a fourth housemate.",
      addressLine: "1234 Arroyo Drive",
      addressCity: "Irvine",
      addressState: "CA",
      addressZip: "92612",
      university: "UC Irvine",
      type: "apartment",
      monthlyRent: 1100,
      bedrooms: 4,
      bathrooms: 2,
      roomType: "single",
      seller: {
        name: "Ice Spice",
      },
      tags: ["Pet-Friendly", "All-Female Household"],
    },
    {
      title: "4 Bed 2 Bath Plaza Verde",
      imageURL:
        "data:image/jpeg;base64,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",
      description:
        "A cozy single room in an apartment of 3 other girls, looking for a fourth housemate.",
      addressLine: "1234 Arroyo Drive",
      addressCity: "Irvine",

      addressState: "CA",
      addressZip: "92612",
      university: "UC Irvine",
      type: "apartment",
      monthlyRent: 1100,
      bedrooms: 4,
      bathrooms: 2,
      roomType: "single",
      seller: {
        name: "Ice Spice",
      },
      tags: ["Pet-Friendly", "All-Female Household"],
    },
  ];

  useEffect(() => {
    getSaved();
  }, []);

  useEffect(() => {
    getListings();
  }, [savedSet]);

  const getSaved = async () => {
    const loggedInUser = localStorage.getItem("userid");
    if (loggedInUser) {
      const docRef = doc(db, "users", loggedInUser);
      const querySnapshot = await getDoc(docRef);

      if (querySnapshot.exists()) {
        const userData = querySnapshot.data();

        const savedSet = new Set(userData.saved);
        setSavedSet(savedSet);
        console.log(savedSet)
      } 
    } 
  }

  const getListings = async () => {
    const listingsRef = collection(db, "listings");
    const querySnapshot = await getDocs(listingsRef);
    
    if (!querySnapshot.empty) {
      let docs = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.savedByUser = savedSet && savedSet.has(doc.id);
        data.id = doc.id;
        docs.push(data);
      })
      setListings(docs);
    }
  };

  return (
    <div className="mx-12 ">
      <h1 className="text-3xl font-medium my-4">Browse Listings</h1>

      {/* text that says browse listing and search bar */}
        <div className="w-full flex flex-col items-center">

      

        {/* search bar */}
        <div className="my-4 grid grid-cols-4">
          <div className="relative col-span-3 w-full h-12 mr-4 ">
            <input
              type="text"
              className="rounded-full border-2 h-full w-full pl-12 border-black"
            />
            <div class="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>  


        </div>
      
      {/* filter bar on top */}
      <div className="flex justify-center">


          {/* by distance */}
          <div>
              <p className="text-medium font-medium">Distance</p>
              <div>
                  <input
                    type="number"
                    name="monthly-rent"
                    id="monthly-rent"
                    min="0"
                    autoComplete="monthly-rent"
                    value={distance}
                    onChange={(e) => setDistance()}
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-6"
                  />
                </div>
          </div>

          {/* by price */}
          <div>
            <p className="text-medium font-medium">Price</p>
            <div>
                <input
                  type="number"
                  name="monthly-rent"
                  id="monthly-rent"
                  min="0"
                  autoComplete="monthly-rent"
                  value={rentMax}
                  onChange={(e) => setRentMax(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-6"
                />
              </div>

          </div>

          {/* by room # */}
          <div>
            <p className="text-medium font-medium"># of Rooms</p>
            <div>
                <input
                  type="number"
                  name="monthly-rent"
                  id="monthly-rent"
                  min="0"
                  autoComplete="monthly-rent"
                  value={rentMax}
                  onChange={(e) => setRentMax(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-6"
                />
              </div>
          </div>
          

          <div>
            {/* Gender Preference */}
            <p className="text-medium font-medium">Gender</p>
            <div>
                <input
                  type="text"
                  name="gender-preference"
                  id="gender-preference"
                  pattern="[FM]"
                  // pattern="[FM]" maybe change?? 
                  autoComplete="gender-preference"
                  value={rentMax}
                  onChange={(e) => setRentMax(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6 mb-6"
                />
              </div>
          </div>
    

          {/* by school */}
          <div>
            <div className="relative rounded-full ml-4 h-12 bg-gray-400">
                <select className="rounded-full border-2 h-full w-full pl-12 border-black">
                  <option>UC Irvine</option>
                  <option>UC Los Angeles</option>
                  <option>UC Riverside</option>
                  <option>CSU Long Beach</option>
                </select>
                <div class="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#5f6368"
                  >
                    <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
                  </svg>
                </div>
              </div>
          </div>
          


        
      </div>

  



      </div>

      {/* school select */}

      <div className="flex gap-8">
        {/* filter sidebar */}


        </div>
        {/* grid of apartments */}
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-8">
          {listings && listings.map((listing) => {
            return <ListingCard listing={listing} />;
          })}
        </div>
      </div>
  );
};

export default Browse;
