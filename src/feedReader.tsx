import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function FeedReader() {
  const [items, setItems] = useState(new Array<any>());
  const [rowVisibility, setRowVisibility] = useState([true]);

  const [showButton, setShowButton] = useState(true);

  const showAll = () => {
    setRowVisibility(rowVisibility.map(() => true));
    setShowButton(!showButton);
  };

  const fetchData = async () => {
    let url =
      'https://cors-anywhere.herokuapp.com/https://www.prlog.org/news/rss.xml';
    return await fetch(url);
  };

  useEffect(() => {
    const response = fetchData();

    response.then(
      (data) => {
        data.text().then((data2) => {
          console.log(data2);
          const feed = new window.DOMParser().parseFromString(
            data2,
            'text/xml'
          );
          const itemsRemote = feed.querySelectorAll('item');
          const feedItems = [...itemsRemote].map((el) => ({
            link: el.querySelector('link')?.innerHTML,
            title: el.querySelector('title')?.innerHTML,
          }));
          setRowVisibility(
            Array.from(Array(Object.keys(feedItems).length), (_k, idx) =>
              idx < 3 ? true : false
            )
          );
          setItems(feedItems);
          setShowButton(feedItems.length > 3);
        });
      },
      () => {
        const itemsError = [
          { title: 'something went wrong with the request', link: '#' },
        ];
        setRowVisibility(
          Array.from(Array(Object.keys(itemsError).length), (_k, idx) =>
            idx < 3 ? true : false
          )
        );
        setItems(itemsError);
        setShowButton(itemsError.length > 3);
      }
    );
  }, []);

  return (
    <Box
      pt={10}
      pb={4}
      px={4}
      id="feedreader"
      bg={'white'}
      minH={'calc(100vh)'}
    >
      <VStack
        spacing={4}
        as={Container}
        maxW={'6xl'}
        textAlign={'left'}
        align={'start'}
      >
        {items &&
          items.length > 0 &&
          items.map((item, idx) => (
            <BlogPostItem
              key={idx}
              display={rowVisibility[idx]}
              title={item.title}
              link={item.link}
            />
          ))}
      </VStack>
      <Button
        w={'full'}
        bg={'green.400'}
        mt={3}
        color={'white'}
        rounded={'xl'}
        boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
        _hover={{
          bg: 'green.500',
        }}
        _focus={{
          bg: 'green.500',
        }}
        fontSize={'2xl'}
        display={showButton ? '' : 'none'}
        onClick={() => showAll()}
      >
        Show all
      </Button>
    </Box>
  );
}

function BlogPostItem(props: any) {
  return (
    <Box
      display={props.display ? '' : 'none'}
      bg={'white'}
      boxShadow={'2xl'}
      width={'full'}
      rounded={'xl'}
      overflow={'hidden'}
      p={4}
    >
      <HStack key={props.id} align={'start'}>
        <Box color={'green.400'} px={2} pt={2}>
          +
        </Box>
        <VStack align={'start'}>
          <Text fontWeight={0} color={'gray.600'} fontSize={'2xl'}>
            {props.title} |{' '}
            <Link
              textDecoration={'underline'}
              href={props.link}
              color={'green.300'}
            >
              View
            </Link>
          </Text>
          <Text color={'gray.600'}>{props.text}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
