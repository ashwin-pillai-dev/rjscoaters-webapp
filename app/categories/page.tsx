import DefaultNavbar from "../components/DefaultNavbar";
import CategoryCard from "../components/categoryCard/categoryCard";
import DefaultFooter from "../components/footer";

export default function page() {
    const CATEGORIES = [
        {id:1,name:'Wellness', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris magna, venenatis vel porttitor in, blandit a justo',src:'/PUNARJITH- OJUSET Capsules.jpg',link:'/Products/Ojuset'},
        {id:2,name:'Piles', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris magna, venenatis vel porttitor in, blandit a justo',src:'/kurol-banner-1.jpg',link:'/Products/Kurol'},
        {id:3,name:'Hair Care', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris magna, venenatis vel porttitor in, blandit a justo',src:'/hair-care-bg.png',link:'/Coming-soon'},
        {id:3,name:'Skin Care', desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris magna, venenatis vel porttitor in, blandit a justo',src:'/skin-care.png',link:'/Coming-soon'},
    ]
    return (
        <div>
            <DefaultNavbar />
            <div className="container mx-auto ">
                <span className="text-2xl px-10 md:px-5  text-primary-700  font-extrabold tracking-tight leading-none">BROWSE BY CATEGORIES</span>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-5 px-10 md:px-4">
                    {CATEGORIES.map((category)=>{
                        return <CategoryCard category={category} key={category.id}/>
                        
                    })


                    }
                    
                </div>

            </div>
            <DefaultFooter />

        </div>
    )
}