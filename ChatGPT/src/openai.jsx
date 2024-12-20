import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export async function sendRes(message) {
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: message,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return res.data.choices[0].text;
}
