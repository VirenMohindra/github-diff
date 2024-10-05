/**
 * Function to execute a script on the active tab
 * @param scriptFunction The function to be executed
 * @param args The arguments to be passed to the function
 * @returns void
 */
const executeInActiveTab = (scriptFunction: (...args: any[]) => void, args: any[] = []): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: scriptFunction,
            args
        });
    });
};

/**
 * Function to load the saved prompt when the popup is opened
 * @returns void
 */
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('userPrompt', (data) => {
        const promptText = data.userPrompt ||
          `You are an expert programmer in React Native and Python. I've provided a diff file.
          I want you to summarize the changes and provide any helpful comments, feedback, fixes,
          and optimizations that can be done to the code to make it better in bullet points.
          I can also provide the files if needed, let me know.`;
        (document.getElementById('promptText') as HTMLTextAreaElement).value = promptText;
    });
});

/**
 * Function to save the prompt whenever it is changed by the user
 * @returns void
 */
document.getElementById('promptText')?.addEventListener('input', async () => {
    const promptText = (document.getElementById('promptText') as HTMLTextAreaElement).value;
    await chrome.storage.sync.set({ userPrompt: promptText });
});

/**
 * Function to open the diff page in a new tab
 * Handles the "Open Diff" button
 * @returns void
 */
document.getElementById('diffButton')?.addEventListener('click', () => {
    executeInActiveTab(() => {
        const prUrl = window.location.href;
        if (!/https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/.test(prUrl)) {
            alert('You are not on a valid PR page. Please navigate to a specific PR.');
            return;
        }
        const normalizedUrl = prUrl.split('/pull/')[0] + prUrl.match(/\/pull\/\d+/)![0];
        window.open(`${normalizedUrl}.diff`, '_blank');
    });
});

/**
 * Function to open ChatGPT with diff content (only works on .diff pages)
 * Handles the "Open in ChatGPT" button
 * @param prompt The prompt text to be sent to ChatGPT
 * @returns void
 */
document.getElementById('chatGPTButton')?.addEventListener('click', () => {
    const promptText = (document.getElementById('promptText') as HTMLTextAreaElement).value;
    executeInActiveTab((prompt: string) => {
        const prUrl = window.location.href;
        if (!prUrl.includes('.diff')) {
            alert('This button only works on .diff pages.');
            return;
        }
        const diffContent = document.body.innerText;
        const formattedPrompt = encodeURIComponent(`${prompt}\n\nHere is the diff:\n\n${diffContent}`);
        window.open(`https://chatgpt.com/?q=${formattedPrompt}`, '_blank');
    }, [promptText]);
});

/**
 * Function to open ChatGPT with raw files content (only works on /files pages)
 * Handle the "Open Raw Files" button
 * @returns void
 */
document.getElementById('rawFilesButton')?.addEventListener('click', () => {
    executeInActiveTab(() => {
        const prUrl = window.location.href;
        if (!/https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+/.test(prUrl)) {
            alert('You are not on a valid PR page. Please navigate to a specific PR.');
            return;
        }
        if (!prUrl.includes('/files')) {
            alert('Please navigate to the "Files changed" tab.');
            return;
        }
        document.querySelectorAll('.file-header').forEach((fileHeader, index) => {
            const kebabButton = fileHeader.querySelector('.octicon-kebab-horizontal');
            if (kebabButton) {
                setTimeout(() => {
                    kebabButton.closest('summary')?.click();
                    setTimeout(() => {
                        const viewRawLink = fileHeader.closest('.file')?.querySelector('a[href*="/raw/"]') as HTMLAnchorElement;
                        if (viewRawLink) window.open(viewRawLink.href, '_blank');
                    }, 500);
                }, index * 1000); // Stagger openings
            }
        });
    });
});
