// api/openaiVisionApi.ts
import axios from 'axios';

const OPENAI_API_KEY = '...';

export const analyzeImageWithOpenAI = async (base64Image: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'system',
            content: 'Ты - AI, который анализирует изображения и даёт описание.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Что изображено на фото?' },
              {
                type: 'image_url',
                image_url: `data:image/jpeg;base64,${base64Image}`,
              },
            ],
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Ошибка анализа изображения:', error);
    return 'Ошибка при обработке изображения.';
  }
};
