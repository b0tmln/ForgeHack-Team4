import ForgeReconciler, { Box,useProductContext, Inline, Text, Lozenge, xcss, Button, Strong } from '@forge/react';
import { requestConfluence } from '@forge/bridge';
import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

const charities = [
  { name: 'American India Foundation', image: '' },
  { name: 'British Asian Trust', image: 'https://wac-cdn.atlassian.com/dam/jcr:52f4a0fd-a07d-4c11-95d4-1ca0fd256d7c/master.png?cdnVersion=1867' },
  { name: 'CareerVillage', image: 'https://clubrunner.blob.core.windows.net/00000010506/Images/CareerVillage-logo.png.jpg' },
  { name: 'Code.org', image: 'https://yt3.googleusercontent.com/ytc/AIdro_n4k0wKZLq25_sCfof3HIOR_Bm0YAhiXfdYwXfG-96OHA=s900-c-k-c0x00ffffff-no-rj' },
  { name: 'Co-Impact', image: 'https://media.licdn.com/dms/image/C560BAQGciDF9IBqxxA/company-logo_200_200/0/1630654804903/collab_impact_logo?e=2147483647&v=beta&t=ZF7LvkWqKUVI6E5Zu9-hHgxUUsn_blKnv3uJUmRO0wE' },
  { name: 'Educate!', image: 'https://images.squarespace-cdn.com/content/v1/520111afe4b0748af59ffc18/1526951076845-92PA6EF98MX89HJYB9EY/Educate-logo-box.jpg' },
  { name: 'Education Outcomes Fund', image: 'https://yt3.googleusercontent.com/ytc/AIdro_lrgVOPLS3kG0uLC0CTQ6echkoFfqi4fiNrfOnQHd4H5g=s900-c-k-c0x00ffffff-no-rj' },
  { name: 'Forte', image: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/a0a80a97-4085-44b4-88b5-0a6e49b4c43e.png' },
  { name: 'Humanitix', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Humanitix_logo_without_wordmark.png' },
  { name: 'Raspberry Pi', image: 'https://d2y4rc9q318ytb.cloudfront.net/accounts/beaec441-926f-4353-b394-7a6128a21bff/540x350/1689175602837-34d9c14d.png' },
  { name: 'Room to Read', image: 'https://static.ethicaljobs.com.au/media/1630979567_oVrxE_.png' },
  { name: 'Ruangguru', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ruang_Guru_logo.svg/1200px-Ruang_Guru_logo.svg.png' },
  { name: 'Schools2030', image: 'https://pbs.twimg.com/profile_images/1414879327053918211/KSllWFKu_400x400.jpg' },
  { name: 'Teach For All', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUCyuo-K3oMzBtJ0djIBc3z-0xxwz3L78uvw&s' },
  { name: 'The Education Commission', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQe2XYkyO-daVomcO_i6_TuHZbhwEkauuBaw&s' },
  { name: 'UPchieve', image: 'https://images.squarespace-cdn.com/content/v1/57c0d8d1e58c622e8b6d5328/1491531731738-JAM59MLO2PW3W6C21VQD/logo.png' },
];

const containerStyles = xcss({
  backgroundColor: 'elevation.surface',
  padding: 'space.200',
  borderColor: 'color.border',
  borderWidth: 'border.width',
  borderStyle: 'solid',
  borderRadius: 'border.radius',
});

const fetchTitle = async (contentId) => {
  const response = await requestConfluence(`/wiki/api/v2/pages/${contentId}?body-format=storage`);
  const data = await response.json();
  return data.title;
};

const fetchBody = async (contentId) => {
  const response = await requestConfluence(`/wiki/api/v2/pages/${contentId}?body-format=storage`);
  const data = await response.json();
  return data.body.storage.value;
};

const App = () => {
  const [pageTitle, setPageTitle] = useState();
  const [body, setBody] = useState('');
  const [bod, setBod] = useState('');
  const context = useProductContext();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (context) {
      const contentId = context.extension.content.id;

      fetchTitle(contentId).then(setPageTitle);
      fetchBody(contentId).then(setBody);
    }
  }, [context]);

  // Function to remove HTML tags and other unwanted characters
  const removeTags = (input) => {
    return input.replace(/<[^>]*>/g, '')
                .replace(/static[^]*?static/g, '')
                .replace(/[^a-zA-Z .]/g, '')
                .replace(/\b\w{46,}\b/g, '');
  };

  useEffect(() => {
    if (body) {
      const cleanedBody = removeTags(body);
      setBod(cleanedBody);
    }
  }, [body]);

  useEffect(() => {
    if (bod) {
      invoke('getText', { inputDescription: bod }).then(setData);
    }
  }, [bod]); // Run effect when bod changes

  // wait until data is fetched
  if (data === null) {
    return <Text>Loading...</Text>;
  }
  return (
    <Box xcss={containerStyles} >
    <Inline spread='space-between' alignBlock="center">
        <Text>
          You may be interested in
          <Lozenge >{charities[data-1].name}</Lozenge>
        </Text>
        
      <Box>
        <Button spacing="compact">Why not support a similar cause</Button>
      </Box>
    </Inline>
    </Box>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);