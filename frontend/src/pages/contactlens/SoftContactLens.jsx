import softlens from '../../assets/softlens.jpeg';


export default function SoftContactLens() {
    return (
        <>
            <div className="section">
                <div className="text-section">
                    <h2>Soft Contact Lenses</h2>
                    <p>
                    Soft contact lenses are made of soft, flexible plastics that allow oxygen to pass 
                    through to the cornea. Soft contact lenses may be easier to adjust to and are more
                    comfortable than rigid gas permeable lenses. Newer soft lens materials include silicone-hydrogels 
                    to provide more oxygen to your eye while you wear your lenses.
                    </p>
                </div>
                <div className="image-section">
                    <img src={softlens} alt="softlens" />
                </div>
            </div>
        </>
    )
}