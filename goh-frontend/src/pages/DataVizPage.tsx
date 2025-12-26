// src/pages/DataVizPage.tsx
import { useState } from 'react';
import './DataVizPage.css';

const dataVisualizations = [
    {
        id: 'child-health',
        label: 'Child Health',
        title: 'Child Mortality Rate (2023)',
        description:
            'The share of newborns who die before reaching the age of five. This is a key indicator of child health and overall development.',
        src: 'https://ourworldindata.org/grapher/child-mortality-rate?tab=map',
    },
    {
        id: 'life-expectancy',
        label: 'Life Expectancy',
        title: 'Life Expectancy at Birth',
        description:
            'The average number of years a newborn would live if age-specific mortality rates in the current year were to stay the same throughout their life.',
        src: 'https://ourworldindata.org/grapher/life-expectancy?tab=map',
    },
    {
        id: 'vaccination',
        label: 'Vaccination',
        title: 'Global Vaccination Coverage',
        description:
            'Share of one-year-olds who have received the basic vaccination doses. Vaccination is one of the most effective public health interventions.',
        src: 'https://ourworldindata.org/grapher/global-vaccination-coverage?tab=map',
    },
    {
        id: 'mental-health',
        label: 'Mental Health',
        title: 'Share with Depression',
        description:
            'Estimated share of the population with depression, showing the global prevalence of mental health challenges.',
        src: 'https://ourworldindata.org/grapher/share-with-depression?tab=map',
    },
];

export default function DataVizPage() {
    const [activeId, setActiveId] = useState(dataVisualizations[0].id);
    const [isLoading, setIsLoading] = useState(true);

    const activeViz = dataVisualizations.find((v) => v.id === activeId) || dataVisualizations[0];

    const handleTabClick = (id: string) => {
        if (id !== activeId) {
            setActiveId(id);
            setIsLoading(true);
        }
    };

    return (
        <div className="dataviz-page">
            <header className="dataviz-header">
                <h1 className="dataviz-title">Global Health Data Explorer</h1>
                <p className="dataviz-subtitle">
                    Explore interactive visualizations powered by live data.
                    Analyze trends across countries and time to understand the state of global health.
                </p>
            </header>

            <div className="dataviz-tabs-container">
                <div className="dataviz-tabs">
                    {dataVisualizations.map((viz) => (
                        <button
                            key={viz.id}
                            className={`dataviz-tab-btn ${activeId === viz.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(viz.id)}
                        >
                            {viz.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="dataviz-content">
                <div className="dataviz-info-card">
                    <h2>{activeViz.title}</h2>
                    <p>{activeViz.description}</p>
                </div>

                {/* 图表容器：去掉了遮罩 div */}
                <div className="dataviz-frame-wrapper">
                    {isLoading && (
                        <div className="dataviz-loading-overlay">
                            <div className="spinner"></div>
                            <span>Loading data visualization...</span>
                        </div>
                    )}

                    <iframe
                        key={activeViz.id}
                        src={activeViz.src}
                        className="dataviz-iframe"
                        loading="lazy"
                        allow="web-share; clipboard-write"
                        onLoad={() => setIsLoading(false)}
                        title={activeViz.title}
                    />
                </div>

                <div className="dataviz-source-note">
                    Data source: Live stream from Our World in Data (UN/WHO backed).
                </div>
            </main>
        </div>
    );
}