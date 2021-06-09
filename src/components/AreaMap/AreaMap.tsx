// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2021 Gemeente Amsterdam
import {
  FunctionComponent,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react'
import type { Point, Position } from 'geojson'
import L, { LatLng } from 'leaflet'
import type { MapOptions, LatLngExpression } from 'leaflet'
import styled from 'styled-components'
import { ViewerContainer, Marker } from '@amsterdam/arm-core'

import Map from 'components/Map'
import MarkerCluster from 'components/MarkerCluster'
import { isStatusEnd } from 'signals/incident-management/definitions/statusList'
import MAP_OPTIONS from 'shared/services/configuration/map-options'
import {
  closedIncidentIcon,
  openIncidentIcon,
  pointerSelectIcon,
  currentIncidentIcon,
} from 'shared/services/configuration/map-markers'
import MapCloseButton from 'components/MapCloseButton'

import { AreaFeature, AreaFeatureCollection, Property } from './types'

const DEFAULT_ZOOM = 13
const FOCUS_RADIUS_METERS = 250

const AREA_MAP_OPTIONS: MapOptions = {
  ...MAP_OPTIONS,
  scrollWheelZoom: true,
}

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`

const StyledMap = styled(Map)`
  height: 100%;
`

export interface AreaMapProps {
  geoData: AreaFeatureCollection
  selectedFeature: AreaFeature | null
  onClose: () => void
  onClick: (feature: AreaFeature | null) => void
  center: Position
}

const AreaMap: FunctionComponent<AreaMapProps> = ({
  geoData,
  center,
  selectedFeature,
  onClose,
  onClick,
}) => {
  const [markers, setMarkers] = useState<L.GeoJSON<Point>>()
  const [map, setMap] = useState<L.Map>()
  const selectedFeatureId = useRef<number>()
  const centerLatLng = useMemo<LatLng>(
    () => new LatLng(center[1], center[0]),
    [center]
  )

  useEffect(() => {
    selectedFeatureId.current = selectedFeature?.properties.id
  }, [selectedFeature?.properties.id])

  const mapOptions: MapOptions = useMemo(
    () => ({
      ...AREA_MAP_OPTIONS,
      center: center as LatLngExpression,
      zoom: DEFAULT_ZOOM,
    }),
    [center]
  )

  const getIncidentIcon = useCallback(
    (feature: AreaFeature): L.Icon => {
      // selected
      if (feature.properties.id === selectedFeature?.properties.id)
        return pointerSelectIcon

      // closed
      if (isStatusEnd(feature.properties.status.state))
        return closedIncidentIcon

      // open
      return openIncidentIcon
    },
    [selectedFeature?.properties.id]
  )

  const getIsSelectedCluster = useCallback(
    /* istanbul ignore next */
    (cluster: L.MarkerCluster): boolean =>
      cluster
        .getAllChildMarkers()
        .some(
          (child: L.Marker<AreaFeature>) =>
            child.feature?.properties.id === selectedFeatureId.current
        ),
    []
  )

  useEffect(() => {
    if (map) {
      // Although the zoom level provides an approximation to the desired bounds, the bounds need to be manually set
      // Set map bounds to approximately twice the size of the focus circle radius
      const bounds = centerLatLng.toBounds(FOCUS_RADIUS_METERS * 2)
      map.fitBounds(bounds)

      // Deselect marker by clicking on map
      map.on({
        click:
          /* istanbul ignore next */
          () => {
            if (selectedFeatureId.current) {
              onClick(null)
            }
          },
      })
    }
  }, [center, centerLatLng, map, onClick])

  // Render focus circle
  useEffect(() => {
    if (map) {
      // Padding factor used to compute size of grey background
      const PAD_FACTOR = 6
      const BACKGROUND_OPACITY = 0.2
      const SVG_SQUARE_SIZE = 200

      // SVG bounds
      const svgBounds = map.getBounds().pad(PAD_FACTOR)

      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', `0 0 ${SVG_SQUARE_SIZE} ${SVG_SQUARE_SIZE}`)

      // Compute SVG width in meters
      const { x, y } = map.getSize()
      const toPoint =
        x > y ? svgBounds.getSouthEast() : svgBounds.getNorthWest()
      const fromPoint = svgBounds.getNorthEast()
      const svgSideLengthInMeters = map.distance(fromPoint, toPoint)

      // Compute radius length relative to the SVG viewBox
      const r = (FOCUS_RADIUS_METERS / svgSideLengthInMeters) * SVG_SQUARE_SIZE

      svg.innerHTML = `
        <rect width="100%" height="100%" mask="url(#areaMapMask)"/>
        <mask id="areaMapMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" opacity="${BACKGROUND_OPACITY}"/>
            <circle r="${r}" cx="100" cy="100" fill="black"/>
        </mask>
      `

      L.svgOverlay(svg, svgBounds).addTo(map)
    }
  }, [map])

  // Render markers
  useEffect(() => {
    if (markers) {
      markers.clearLayers()
      L.geoJSON<Property>(geoData, {
        pointToLayer: (feature, latlng) => {
          const icon = getIncidentIcon(feature)
          const marker = L.marker(latlng, {
            icon,
          })

          marker.on({
            click:
              /* istanbul ignore next */
              () => onClick(feature),
          })

          return marker
        },
      }).addTo(markers)
    }
  }, [geoData, getIncidentIcon, markers, onClick, selectedFeatureId])

  return (
    <Wrapper>
      <StyledMap hasZoomControls mapOptions={mapOptions} setInstance={setMap}>
        <Marker
          latLng={centerLatLng}
          options={{
            icon: currentIncidentIcon,
            interactive: false,
            zIndexOffset: -100,
          }}
        />
        <MarkerCluster
          setInstance={setMarkers}
          getIsSelectedCluster={getIsSelectedCluster}
        />
        <ViewerContainer topRight={<MapCloseButton onClick={onClose} />} />
      </StyledMap>
    </Wrapper>
  )
}

export default AreaMap
