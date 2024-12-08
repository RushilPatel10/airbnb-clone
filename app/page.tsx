import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";

export interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  // Parse and validate searchParams
  const params: IListingsParams = {
    userId: searchParams.userId,
    guestCount: searchParams.guestCount ? parseInt(searchParams.guestCount.toString()) : undefined,
    roomCount: searchParams.roomCount ? parseInt(searchParams.roomCount.toString()) : undefined,
    bathroomCount: searchParams.bathroomCount ? parseInt(searchParams.bathroomCount.toString()) : undefined,
    locationValue: searchParams.locationValue,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    category: searchParams.category,
  };

  const listings = await getListings(params);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
