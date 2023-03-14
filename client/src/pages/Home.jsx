import React, {useState, useEffect} from 'react'
import { Loader, Crad, Form } from '../components'

const RenderCards = ({ data, title}) => {
 if (data?.length > 0){ return data.map((post) => {
    return (
      <Crad key={post._id} {...post} />
    )
 })
}
  return (
    <h2 className="font-bold mt-5 text-xl uppsercase text-[#6469ff]">
      {title}
    </h2>
  )
}

const Home = () => {
  const [Loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchedText, setSearchedText] = useState('abc');
  return (
    <section className='max-w-7xl mx-auto '>
      <div>
        <h1 className="font-extrabold text-[#22328] text-[32px]">
          The <span className="text-[#6469ff]">Community</span> Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of the of amazing generated IMAGES. 
        </p>
      </div>
      <div className="mt-16">
        <Form />
      </div>
      <div className="mt-10">
        {Loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ): (
          <>
            {searchedText && (
              <h2 className="font-medium text-xl mb-3 text-[#666e75]">
                Search Results for 
                <span className="text-[#6469ff]"> {searchedText}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 xs:grid-cols-2 lg:grid-cols-4 gap-3">
              {
                searchedText ? (
                  <RenderCards
                    data={[]}
                    title="No Results Found"
                  />
                ): (
                  <RenderCards data={[]} title="No Posts Found" />
                )
              }
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home
