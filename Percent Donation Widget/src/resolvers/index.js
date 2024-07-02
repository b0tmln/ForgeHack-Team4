import Resolver from '@forge/resolver';
import api, { route } from "@forge/api";

const resolver = new Resolver();

// Payment function to call Percent API
resolver.define('payment', async (req) => {
  const { amount, currencyCode, firstName, lastName, email, consentedToBeContactedByOrg, userId, organisationId } = req.body;

  const response = await api.fetch('https://api.percent.com/v1/donations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SecretApiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': 'unique-key-for-this-request' // Ensure this is unique for each request
    },
    body: JSON.stringify({
      amount: parseInt(amount, 10),
      currencyCode,
      userId,
      organisationId,
      firstName,
      lastName,
      email,
      consentedToBeContactedByOrg,
      anonymous: "no",
      metadata: {}
    })
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    return { error: `Request failed with status ${response.status}`, details: errorData };
  }
});

export const handler = resolver.getDefinitions();